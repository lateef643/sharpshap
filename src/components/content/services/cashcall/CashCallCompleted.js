import React from "react";
import { Link } from "react-router-dom";

import formatToCurrency from "../../../../util/formatToCurrency";
import check from "../../../../assets/images/check.svg";
import logo from "../../../../assets/images/cico-logo.svg";

import styles from "./CashCallCompleted.module.scss";

export const CashCallCompleted = ({ cashCallState }) => {
  // con
  return (
    <div className={styles.section}>
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={check} alt="checkmark" />
        <img
          className={styles.headingImagePrint}
          src={logo}
          alt="cico logo for print"
        />
        <p className={styles.headingText}>Cash call completed!</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.transactionDetails}>
          <div>
            <span>Transaction:</span>
            <span>Cash call</span>
          </div>
          <div>
            <span>Date</span>
            <span>{cashCallState.date}</span>
          </div>
          <div>
            <span>Status:</span>
            <span>Accepted</span>
          </div>
        </div>
        <div className={styles.transactionAmount}>
          <div>
            <span>Amount:</span>
            <span>{formatToCurrency(cashCallState.amount)}</span>
          </div>
          <div>
            <span>Convenience Fee:</span>
            <span>{formatToCurrency(0)}</span>
          </div>
          <div className={styles.total}>
            <span>Total:</span>
            <span>{formatToCurrency(cashCallState.amount)}</span>
          </div>
        </div>
        <div className={styles.link}>
          <Link to="/" className={styles.linkHome}>
            Home
          </Link>
          <button
            onClick={() => window.print()}
            className={styles.linkServiceHome}
          >
            Print
          </button>
          {/* <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a> */}
        </div>
      </div>
    </div>
  );
};

export default CashCallCompleted;
