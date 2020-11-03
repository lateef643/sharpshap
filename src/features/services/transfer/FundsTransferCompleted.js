import React from "react";
import { Link } from "react-router-dom";

import formatToCurrency from "../../../util/formatToCurrency";
import check from "../../../assets/images/check.svg";
import pending from "../../../assets/images/pending.svg";

import styles from "./FundsTransferCompleted.module.scss";

export const FundsTransferCompleted = (props) => {
  const { successData, setComponentToRender, FundsTransferFormState } = props;
  const {
    beneficiaryBankName,
    amount,
    accountNumber,
    accountName,
    total,
  } = FundsTransferFormState;
  const { date, transactionCost, status, reference, message } = successData;

  return (
    <div className={styles.section}>
      <div className={styles.imageContainer}>
        <img
          className={styles.headingImage}
          src={
            status === "successful" ||
            status === "success" ||
            status === "Successful" ||
            status === "Success"
              ? check
              : pending
          }
          alt=""
        />
        <p className={styles.headingText}>{message}</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.transactionDetails}>
          <div>
            <span>Payment Reference:</span>
            <span>{reference}</span>
          </div>
          <div>
            <span>Beneficiary Bank:</span>
            <span>{beneficiaryBankName}</span>
          </div>
          <div>
            <span>Beneficiary Name:</span>
            <span>{accountName}</span>
          </div>
          <div>
            <span>Beneficiary Account:</span>
            <span>{accountNumber}</span>
          </div>
          <div>
            <span>Status:</span>
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
            <span>{formatToCurrency(transactionCost)}</span>
          </div>
          <div className={styles.total}>
            <span>Total:</span>
            <span>{formatToCurrency(total)}</span>
          </div>
        </div>
        <div className={styles.link}>
          <Link to="/" className={styles.linkHome}>
            Home
          </Link>
          <a
            onClick={() => setComponentToRender("form")}
            className={styles.linkServiceHome}
          >
            New Payment
          </a>
        </div>
      </div>
    </div>
  );
};

export default FundsTransferCompleted;
