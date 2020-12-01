import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import formatToCurrency from "../../../utils/formatToCurrency";
import { ThreeDots } from "svg-loaders-react";
import generateNetworkImageUrl from "./generateNetworkImageUrl";

import styles from "./BuyAirtimeSummary.module.scss";

export const BuyAirtimeSummary = (props) => {
  const {
    AirtimePurchaseFormState,
    loading,
    handleOnSubmit,
    transactionCost,
    service,
  } = props;
  const { phone, amount } = AirtimePurchaseFormState;

  const networkImageUrl = generateNetworkImageUrl(service);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.bankLogo} src={networkImageUrl} alt="" />
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
            {formatToCurrency(amount)}
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
        <span className={styles.totalDetails}>{formatToCurrency(amount)}</span>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
        className={styles.button}
      >
        {loading ? <ThreeDots /> : "Continue"}
      </button>
    </div>
  );
};

BuyAirtimeSummary.propTypes = {
  AirtimePurchaseFormState: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(BuyAirtimeSummary);
