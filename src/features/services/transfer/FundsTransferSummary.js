import React from "react";
import PropTypes from "prop-types";

import generateBankImageUrl from "./generateBankImageUrl";
import formatToCurrency from "../../../utils/formatToCurrency";
import { ThreeDots } from "svg-loaders-react";

import styles from "./FundsTransferSummary.module.scss";

var Barcode = require("react-barcode");

export const FundsTransferSummary = (props) => {
  const {
    FundsTransferFormState: state,
    loading,
    handleOnSubmit,
    transactionCost,
  } = props;

  const bankImageUrl = generateBankImageUrl(state.beneficiaryBankCode);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.bankLogo} src={bankImageUrl} alt="" />
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
            {formatToCurrency(transactionCost)}
          </span>
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.totalHeading}>Total:</span>
        <span className={styles.totalDetails}>
          {formatToCurrency(state.total)}
        </span>
      </div>
      <Barcode
        value="https://www.cico.ng"
        width={1.1}
        height={50}
        marginTop={30}
        fontSize={16}
        displayValue={false}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
        className={styles.button}
      >
        {loading ? <ThreeDots /> : "Proceed"}
      </button>
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
