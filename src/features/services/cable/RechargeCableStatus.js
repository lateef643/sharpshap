import React from "react";
import { Link } from "react-router-dom";

import formatToCurrency from "../../../util/formatToCurrency";
import check from "../../../assets/images/check.svg";

import styles from "./RechargeCableStatus.module.scss";

export const RechargeCableStatus = (props) => {
  const {
    successData,
    smartCardNumber,
    provider,
    plan,
    transactionCost,
    setComponentToRender,
  } = props;

  return (
    <div className={styles.section}>
      <div className={styles.imageContainer}>
        <img
          className={styles.headingImage}
          src={check}
          alt="transaction status icon"
        />
        <p className={styles.headingText}>Transaction Successful</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.transactionDetails}>
          <div>
            <span>Transaction Reference:</span>
            <span>{successData.transactionRef}</span>
          </div>
          <div>
            <span>Provider:</span>
            <span>{provider}</span>
          </div>
          <div>
            <span>Plan:</span>
            <span>{plan}</span>
          </div>
          <div>
            <span>Smartcard:</span>
            <span>{smartCardNumber}</span>
          </div>
          <div>
            <span>Date:</span>
            <span>{successData.date}</span>
          </div>
        </div>
        <div className={styles.transactionAmount}>
          <div>
            <span>Amount:</span>
            <span>{formatToCurrency(successData.amount)}</span>
          </div>
          <div>
            <span>Convenience Fee:</span>
            <span>{formatToCurrency(transactionCost)}</span>
          </div>
          <div>
            <span>Total:</span>
            <span>{formatToCurrency(successData.amount)}</span>
          </div>
        </div>
        <div className={styles.link}>
          <Link to="/" className={styles.linkHome}>
            Home
          </Link>
          <button
            onClick={() => setComponentToRender("form")}
            className={styles.linkServiceHome}
          >
            New Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RechargeCableStatus;