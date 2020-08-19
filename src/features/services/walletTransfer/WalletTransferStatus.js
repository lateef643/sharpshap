import React from "react";
import { Link } from "react-router-dom";

import formatToCurrency from "../../../util/formatToCurrency";
import check from "../../../assets/images/check.svg";

import styles from "./WalletTransferStatus.module.scss";

export const WalletTransferStatus = ({ successData, date, setStatus }) => {
  const { customer_info, mode, status, amount, reference } = successData;

  return (
    <div className={styles.section}>
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={check} alt="checkmark" />
        <p className={styles.headingText}>Transaction Successful</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.transactionDetails}>
          <div>
            <span>Recipient:</span>
            <span>{customer_info}</span>
          </div>
          <div>
            <span>Transaction Reference:</span>
            <span>{reference}</span>
          </div>
          <div>
            <span>Type:</span>
            <span>{mode}</span>
          </div>
          <div>
            <span>Status</span>
            <span>{status}</span>
          </div>
          <div>
            <span>Date:</span>
            <span>{date}</span>
          </div>
        </div>
        <div className={styles.transactionAmount}>
          <div>
            <span>Amount:</span>
            <span>{formatToCurrency(amount)}</span>
          </div>
          <div>
            <span>Convenience Fee:</span>
            <span>{formatToCurrency(0)}</span>
          </div>
          <div>
            <span>Total:</span>
            <span>{formatToCurrency(amount)}</span>
          </div>
        </div>
        <div className={styles.link}>
          <Link to="/" className={styles.linkHome}>
            Home
          </Link>
          <button
            className={styles.linkServiceHome}
            onClick={() => window.print()}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletTransferStatus;
