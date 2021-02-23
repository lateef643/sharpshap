import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";
import formatToCurrency from "../../../utils/formatToCurrency";
import { ThreeDots } from "svg-loaders-react";

import styles from "./ElectricityPaymentSummary.module.scss";

var Barcode = require("react-barcode");

export const ElectricityPaymentSummary = (props) => {
  const {
    ElectricityPaymentFormState: state,
    handleOnSubmit,
    loading,
    transactionCost,
  } = props;
  const { disco, meterNo, accountName, paymentPlan, amount, phone } = state;

  let serviceImageUrl = generateServiceProviderImageUrl(props.service);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.bankLogo} src={serviceImageUrl} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Disco:</span>
          <span className={styles.contentDetails}>{disco}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Meter Number:</span>
          <span className={styles.contentDetails}>{meterNo}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Account Name:</span>
          <span className={styles.contentDetails}>{accountName}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Plan:</span>
          <span className={styles.contentDetails}>{paymentPlan}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Phone No:</span>
          <span className={styles.contentDetails}>{phone}</span>
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
        <span className={styles.totalHeading}>Total</span>
        <span className={styles.totalDetails}>{formatToCurrency(amount)}</span>
      </div>
      <Barcode
        value="https://www.cico.ng"
        width={1.25}
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
        {loading ? <ThreeDots /> : "Continue"}
      </button>
    </div>
  );
};

ElectricityPaymentSummary.propTypes = {
  ElectricityPaymentFormState: PropTypes.object.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  transactionCost: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
  };
};

export default connect(mapStateToProps)(ElectricityPaymentSummary);
