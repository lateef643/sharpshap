import React from "react";
import { Link } from "react-router-dom";

import formatToCurrency from "../../../utils/formatToCurrency";
import generateBankImageUrl from "./generateBankImageUrl";

import styles from "./FundsTransferCompleted.module.scss";
var Barcode = require("react-barcode");

export const FundsTransferCompleted = (props) => {
  const { successData, setComponentToRender, FundsTransferFormState } = props;
  const {
    beneficiaryBankName,
    amount,
    accountNumber,
    accountName,
    total,
    beneficiaryBankCode,
  } = FundsTransferFormState;
  const { date, transactionCost, status, reference } = successData;

  const bankImageUrl = generateBankImageUrl(beneficiaryBankCode);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.bankLogo} src={bankImageUrl} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Payment Reference:</span>
          <span className={styles.contentDetails}>{reference}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Beneficiary Bank:</span>
          <span className={styles.contentDetails}>{beneficiaryBankName}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Beneficiary Name:</span>
          <span className={styles.contentDetails}>{accountName}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Beneficiary Account:</span>
          <span className={styles.contentDetails}>{accountNumber}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Status:</span>
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
        <span className={styles.contentDetails}>
          {formatToCurrency(transactionCost)}
        </span>
      </div>
      <div className={styles.total}>
        <span className={styles.totalHeading}>Total:</span>
        <span className={styles.totalDetails}>{formatToCurrency(total)}</span>
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
        <div
          className={`${styles.buttonAction} ${styles.buttonHome}`}
          onClick={() => window.print()}
        >
          Print
        </div>
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

export default FundsTransferCompleted;
