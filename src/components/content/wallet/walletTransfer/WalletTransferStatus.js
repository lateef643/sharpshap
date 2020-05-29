import React from "react";
import { Link } from "react-router-dom";

import formatToCurrency from "../../../../util/formatToCurrency";
import check from "../../../../assets/images/check.svg";

import styles from './WalletTransferStatus.module.scss';

export const WalletTransferStatus = (props) => { 
  const { successData, transactionCost, total, agentId, setComponentToRender } = props;
  return (
    <div className={styles.section} >
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={check} alt="checkmark" />
        <p className={styles.headingText}>Transaction Successful</p>
      </div>
      <div className={styles.contentContainer}>
      <div className={styles.transactionDetails}>
        <div>
          <span>Transaction Reference:</span>
          <span>{successData.reference}</span>
        </div>
        <div>
          <span>Type:</span>
          <span>{successData.mode}</span>
        </div>
        <div>
          <span>Recipient:</span>
          <span>{successData.customer_info}</span>
        </div>
        <div>
          <span>Recipient ID:</span>
          <span>{agentId}</span>
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
          <span>{formatToCurrency(total)}</span>  
        </div>
      </div>
      <div className={styles.link}>
        <Link to="/" className={styles.linkHome}>Home</Link>
        <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a>
      </div>
    </div> 
    </div>    
)};

export default WalletTransferStatus;