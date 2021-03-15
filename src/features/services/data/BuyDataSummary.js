import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ThreeDots } from "svg-loaders-react";

import Submit from "../../../components/common/Button";

import back from "../../../assets/images/left-arrow.svg";
import info from "../../../assets/images/tooltip-icon.svg";
import formatToCurrency from "../../../utils/formatToCurrency";
import generateNetworkImageUrl from "./generateNetworkImageUrl";

import styles from "./BuyDataSummary.module.scss";

export const BuyDataSummary = (props) => {
  const {
    DataPurchaseFormState,
    loading,
    handleOnSubmit,
    transactionCost,
    setComponentToRender,
    service,
  } = props;
  const { phone, amount } = DataPurchaseFormState;

  const networkImageUrl = generateNetworkImageUrl(service);

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
        <img className={styles.logo} src={networkImageUrl} alt="" />
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
          <span className={styles.contentHeading}>Phone Number:</span>
          <span className={styles.contentDetails}>{phone}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction:</span>
          <span className={styles.contentDetails}>Airtime Purchase</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Network:</span>
          <span className={styles.contentDetails}>{service}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(amount)}
          </span>
        </div>
      </div>
      <div className={`${styles.contentItem} ${styles.total}`}>
        <span className={`${styles.contentHeading} ${styles.totalHeading}`}>
          Total:
        </span>
        <span className={`${styles.contentDetails} ${styles.totalDetails}`}>
          &#8358;{formatToCurrency(amount)}
        </span>
      </div>
      <Submit
        onClick={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {loading ? <ThreeDots fill="white" /> : "Proceed"}
      </Submit>
    </div>
  );
};

BuyDataSummary.propTypes = {
  DataPurchaseFormState: PropTypes.object.isRequired,
  selectedNetworkName: PropTypes.string.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  transactionCost: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
  };
};

export default connect(mapStateToProps)(BuyDataSummary);
