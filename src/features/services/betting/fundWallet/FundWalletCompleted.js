import React from "react";

import formatToCurrency from "../../../../utils/formatToCurrency";
import cloudbet from "../../../../assets/icons/cloudbet.png";

import styles from "./FundWalletCompleted.module.scss";

var Barcode = require("react-barcode");

export const FundsTransferCompleted = (props) => {
  const { accountId } = props.FundWalletFormState;
  const { successData, transactionCost, setComponentToRender } = props;

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={cloudbet} alt="" />
      </div>
      <div className={styles.indentEffect}>
        <span className={styles.indentEffectLeft}></span>
        <span className={styles.indentEffectRight}></span>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Recipient:</span>
          <span className={styles.contentDetails}>{accountId}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Reference:</span>
          <span className={styles.contentDetails}>{successData.reference}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Type:</span>
          <span className={styles.contentDetails}>Wallet funding</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(successData.amount)}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Convenience Fee:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(transactionCost)}
          </span>
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.totalHeading}>Total:</span>
        <span className={styles.totalDetails}>
          &#8358;{formatToCurrency(successData.amount)}
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
