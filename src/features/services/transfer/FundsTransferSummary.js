import React from "react";
import PropTypes from "prop-types";
import { ThreeDots } from "svg-loaders-react";

import Submit from "../../../components/common/Button";

import back from "../../../assets/images/left-arrow.svg";
import info from "../../../assets/images/tooltip-icon.svg";
import generateBankImageUrl from "./generateBankImageUrl";
import formatToCurrency from "../../../utils/formatToCurrency";

import styles from "./FundsTransferSummary.module.scss";

export const FundsTransferSummary = (props) => {
  const {
    FundsTransferFormState: state,
    loading,
    setComponentToRender,
    handleOnSubmit,
    transactionCost,
  } = props;

  const bankImageUrl = generateBankImageUrl(state.beneficiaryBankCode);

  return (
    <div className={styles.container}>
      <div
        className={styles.back}
        onClick={() => {
          setComponentToRender("form");
        }}
      >
        <img className={styles.backIcon} src={back} alt="" />
        <span className={styles.backText}>Back</span>
      </div>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={bankImageUrl} alt="" />
      </div>
      <div className={styles.heading}>
        <div className={styles.headingIconContainer}>
          <img className={styles.headingIcon} src={info} alt="" />
        </div>
        <div className={styles.headingText}>
          Verify the information before proceeding.
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Account Name:</span>
          <span className={styles.contentDetails}>{state.accountName}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Bank:</span>
          <span className={styles.contentDetails}>
            {state.beneficiaryBankName}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Account Number:</span>
          <span className={styles.contentDetails}>{state.accountNumber}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Phone Number:</span>
          <span className={styles.contentDetails}>{state.phone}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(state.amount)}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction cost:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(transactionCost)}
          </span>
        </div>
        <div className={`${styles.contentItem} ${styles.total}`}>
          <span className={`${styles.contentHeading} ${styles.totalHeading}`}>
            Total:
          </span>
          <span className={`${styles.contentDetails} ${styles.totalDetails}`}>
            &#8358;{formatToCurrency(state.total)}
          </span>
        </div>
      </div>
      <Submit disabled={false} onClick={handleOnSubmit}>
        {loading ? <ThreeDots fill="white" /> : "Proceed"}
      </Submit>
    </div>
  );
};

FundsTransferSummary.propTypes = {
  FundsTransferFormState: PropTypes.object,
  loading: PropTypes.bool,
  handleOnSubmit: PropTypes.func,
  transactionCost: PropTypes.number,
};

export default FundsTransferSummary;
