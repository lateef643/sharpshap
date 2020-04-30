import React from "react";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import cross from "../../../../assets/images/redCross.svg";
import styles from './TransferStatus.module.scss';

export const TransferStatus = (props) => { 
  const { successData, transactionStatus, setComponentToRender, amount, total, transactionCost } = props;
  
  return (
    <div className={transactionStatus ? styles.section : `${styles.section} ${styles.sectionFailed}`} >
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={transactionStatus ? check : cross} alt="checkmark" />
        <p className={styles.headingText}>{transactionStatus ? "Transaction Successful" : "Transaction Failed"}</p>
      </div>
      <div className={styles.contentContainer}>
        {transactionStatus ? 
        <div className={styles.successContent}>
          <div className={styles.transactionDetails}>
            <div>
              <span>Payment Reference:</span>
              <span>{successData.payment_reference}</span>  
            </div>
            <div>
              <span>Beneficiary Bank:</span>
              <span>{successData.bank}</span>  
            </div>
            <div>
              <span>Beneficiary Name:</span>
              <span>{successData.beneficiary_account_name}</span>  
            </div>
            <div>
              <span>Beneficiary Account:</span>
              <span>{successData.beneficiary_account_number}</span>  
            </div>
            <div>
              <span>Date:</span>
              <span>{successData.date}</span>  
            </div>
          </div>
          <div className={styles.transactionAmount}>
            <div>
              <span>Amount:</span>
              <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
            </div>
            <div>
              <span>Convenience Fee:</span>
              <span>&#8358;{Number(transactionCost).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
            </div>
            <div className={styles.total}>
              <span>Total:</span>
              <span>&#8358;{Number(total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
            </div>
          </div>
            <div className={styles.link}>
              <Link to="/" className={styles.linkHome}>Home</Link>
              <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a>
            </div>
          </div>  
        : <div className={styles.failedContent}>
            <p>We were unable to process your transaction, 
              please try again later!</p>  
            <div><Link to="/">&larr; Home</Link></div>
          </div>
      }
      </div>
    </div>    
)};

export default TransferStatus;