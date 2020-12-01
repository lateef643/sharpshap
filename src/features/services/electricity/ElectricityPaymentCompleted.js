import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import formatToCurrency from "../../../utils/formatToCurrency";
import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";
import styles from "./ElectricityPaymentCompleted.module.scss";

var Barcode = require("react-barcode");

export const ElectricityPaymentCompleted = ({
  successData,
  ElectricityPaymentFormState,
  service,
}) => {
  const {
    payer,
    unit_value,
    unit,
    token,
    transactionID,
    date,
    amount,
    address,
  } = successData;
  // const { account } = ElectricityPaymentFormState;

  let serviceImageUrl = generateServiceProviderImageUrl(service);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.bankLogo} src={serviceImageUrl} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Name:</span>
          <span className={styles.contentDetails}>{payer.trim()}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Account No:</span>
          <span className={styles.contentDetails}>{address}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Units</span>
          <span className={styles.contentDetails}>
            {unit_value + unit || "NIL"}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Token</span>
          <span className={styles.contentDetails}>{token || "NIL"}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction ID:</span>
          <span className={styles.contentDetails}>{transactionID}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Date:</span>
          <span className={styles.contentDetails}>{date}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(amount)}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Convenience Fee:</span>
          <span className={styles.contentDetails}>{formatToCurrency(0)}</span>
        </div>
      </div>

      <div className={styles.total}>
        <span className={styles.totalHeading}>Total:</span>
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
      <div className={styles.action}>
        <Link to="/" className={`${styles.buttonAction} ${styles.buttonHome}`}>
          Home
        </Link>
        <button
          onClick={() => window.print()}
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

export default connect(mapStateToProps)(ElectricityPaymentCompleted);
