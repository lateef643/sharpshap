import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";
import formatToCurrency from "../../../utils/formatToCurrency";
import styles from "./RechargeCableStatus.module.scss";

var Barcode = require("react-barcode");

export const RechargeCableStatus = (props) => {
  const {
    successData,
    smartCardNumber,
    provider,
    plan,
    transactionCost,
    setComponentToRender,
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
          <span className={styles.contentHeading}>Transaction Reference:</span>
          <span className={styles.contentDetails}>
            {successData.transactionRef}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Provider:</span>
          <span className={styles.contentDetails}>{provider}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Plan:</span>
          <span className={styles.contentDetails}>{plan}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Smartcard:</span>
          <span className={styles.contentDetails}>{smartCardNumber}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Date:</span>
          <span className={styles.contentDetails}>{successData.date}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(successData.amount)}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Convenience Fee:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(transactionCost)}
          </span>
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.totalHeading}>Total:</span>
        <span className={styles.totalDetails}>
          {formatToCurrency(successData.amount)}
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
      <div className={styles.action}>
        <Link to="/" className={`${styles.buttonAction} ${styles.buttonHome}`}>
          Home
        </Link>
        <button
          onClick={() => setComponentToRender("form")}
          className={`${styles.buttonAction} ${styles.buttonRestart}`}
        >
          New Payment
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
  };
};

export default connect(mapStateToProps)(RechargeCableStatus);
