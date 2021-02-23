import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ThreeDots } from "svg-loaders-react";

import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";

import formatToCurrency from "../../../utils/formatToCurrency";

import styles from "./RechargeCableSummary.module.scss";

var Barcode = require("react-barcode");

export const RechargeCableSummary = (props) => {
  const {
    RechargeCableFormState: state,
    loading,
    handleOnSubmit,
    transactionCost,
    service,
  } = props;

  const serviceProviderImageUrl = generateServiceProviderImageUrl(service);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.bankLogo} src={serviceProviderImageUrl} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Service:</span>
          <span className={styles.contentDetails}>{state.provider}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Plan:</span>
          <span className={styles.contentDetails}>
            {state.selectedPlanName}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Account Name:</span>
          <span className={styles.contentDetails}>{state.customerName}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Smart card:</span>
          <span className={styles.contentDetails}>{state.smartCardNumber}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Plan Duration:</span>
          <span className={styles.contentDetails}>
            {state.selectedPlanDuration}
          </span>
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
          {formatToCurrency(state.amount)}
        </span>
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

RechargeCableSummary.propTypes = {
  RechargeCableFormState: PropTypes.object,
  loading: PropTypes.bool,
  handleOnSubmit: PropTypes.func,
  transactionCost: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
  };
};

export default connect(mapStateToProps)(RechargeCableSummary);
