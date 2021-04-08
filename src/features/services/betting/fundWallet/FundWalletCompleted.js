import React from "react";

import formatToCurrency from "../../../../utils/formatToCurrency";
import generateProviderImageUrl from "../generateProviderImageUrl";

import styles from "./FundWalletCompleted.module.scss";

var Barcode = require("react-barcode");

export const FundsTransferCompleted = (props) => {
  // const { accountId } = props.FundWalletFormState;
  const { successData, transactionCost, setComponentToRender, service } = props;
  const {
    amount,
    status,
    customer_info,
    reference,
    created_at,
    id,
  } = successData;

  const logo = generateProviderImageUrl(service);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="" />
      </div>
      <div className={styles.indentEffect}>
        <span className={styles.indentEffectLeft}></span>
        <span className={styles.indentEffectRight}></span>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Recipient:</span>
          <span className={styles.contentDetails}>{customer_info}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Status:</span>
          <span className={styles.contentDetails}>{status}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Date:</span>
          <span className={styles.contentDetails}>{created_at}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction ID:</span>
          <span className={styles.contentDetails}>{id}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Reference:</span>
          <span className={styles.contentDetails}>{reference}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Type:</span>
          <span className={styles.contentDetails}>Wallet funding</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(amount)}
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
          &#8358;{formatToCurrency(amount)}
        </span>
      </div>
      <div className={styles.barCodeContainer}>
        <Barcode
          value="https://www.cico.ng"
          width={1.21}
          height={50}
          marginTop={20}
          displayValue={false}
        />
      </div>
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
