import React from "react";
import { Link } from "react-router-dom";

import formatToCurrency from "../../../utils/formatToCurrency";
import logo from "../../../assets/icons/cico-logo-regular.svg";

import styles from "./WalletTransferStatus.module.scss";

var Barcode = require("react-barcode");

export const WalletTransferStatus = ({ successData, date, setStatus }) => {
  const { customer_info, mode, status, amount, reference } = successData;

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.bankLogo} src={logo} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Recipient:</span>
          <span className={styles.contentDetails}>{customer_info}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction Reference:</span>
          <span className={styles.contentDetails}>{reference}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Type:</span>
          <span className={styles.contentDetails}>{mode}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Status</span>
          <span className={styles.contentDetails}>{status}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Date:</span>
          <span className={styles.contentDetails}>{date}</span>
        </div>
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
          className={`${styles.buttonAction} ${styles.buttonRestart}`}
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default WalletTransferStatus;
