import React from "react";
import { Link } from "react-router-dom";

import formatToCurrency from "../../../../util/formatToCurrency";
import check from "../../../../assets/images/check.svg";
import logo from "../../../../assets/images/cico-logo.svg";

import styles from './ElectricityPaymentCompleted.module.scss';

export const ElectricityPaymentCompleted = ({ successData }) => { 
  const { name, account, token, receipt_no, txndate, amountPaid, units} = successData;
  
  return (
    <div className={styles.section}>
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={check} alt="checkmark" />
        <img className={styles.headingImagePrint} src={logo} alt="cico logo for print" />
        <p className={styles.headingText}>Transaction Successful</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.transactionDetails}>
          <div>
            <span>Name:</span>
            <span>{name}</span>  
          </div>
          <div>
            <span>Account No:</span>
            <span>{account}</span>
          </div>
          <div>
            <span>Units</span>
            <span>{units || "POSTPAID"}</span>  
          </div>
          <div>
            <span>Token</span>
            <span>{token || "POSTPAID"}</span>  
          </div>
          <div>
            <span>Receipt No:</span>
            <span>{receipt_no}</span>  
          </div>
          <div>
            <span>Date:</span>
            <span>{txndate}</span>  
          </div>
        </div>
        <div className={styles.transactionAmount}>
          <div>
            <span>Amount:</span>
            <span>{formatToCurrency(amountPaid)}</span>  
          </div>
          <div>
            <span>Convenience Fee:</span>
            <span>{formatToCurrency(0)}</span>  
          </div>
          <div className={styles.total}>
            <span>Total:</span>
            <span>{formatToCurrency(amountPaid)}</span>  
          </div>
        </div>
          <div className={styles.link}>
            <Link to="/" className={styles.linkHome}>Home</Link>
            <a onClick={() => window.print()} className={styles.linkServiceHome}>Print</a>
            {/* <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a> */}
          </div>
        </div>
      </div>
)};

export default ElectricityPaymentCompleted;