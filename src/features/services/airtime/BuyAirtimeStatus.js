import React from "react";
import { Link } from "react-router-dom";

import formatToCurrency from "../../../util/formatToCurrency";
import check from "../../../assets/images/check.svg";

import styles from "./BuyAirtimeStatus.module.scss";

export const BuyAirtimeStatus = (props) => {
  const { successData, transactionCost, setComponentToRender } = props;

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
            <span>{successData.tranxReference}</span>
          </div>
          <div>
            <span>Type:</span>
            <span>Airtime Purchase</span>
          </div>
          <div>
            <span>Network:</span>
            <span>{successData.network}</span>
          </div>
          <div>
            <span>Recipient:</span>
            <span>{successData.recipient}</span>
          </div>
          <div>
            <span>Date:</span>
            <span>{successData.tranxDate}</span>
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
            <span>
              <b>Total:</b>
            </span>
            <span>
              <b>{formatToCurrency(successData.amount)}</b>
            </span>
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

export default BuyAirtimeStatus;
