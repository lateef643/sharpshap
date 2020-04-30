import React from "react";
import { Link } from "react-router-dom";
import cross from "../../../../assets/images/redCross.svg";
import check from "../../../../assets/images/check.svg";
import styles from './BuyAirtimeStatus.module.scss';

export const BuyAirtimeStatus = (props) => {
  const { successData, transactionStatus, transactionCost, setComponentToRender } = props;
  
  return (
    <div className={transactionStatus ? styles.section : `${styles.section} ${styles.sectionFailed}`} >
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={transactionStatus ? check : cross} alt="transaction status icon" />
        <p className={styles.headingText}>{transactionStatus ? "Transaction Successful" : "Transaction Failed"}</p>
      </div>
      <div className={styles.contentContainer}>
        {transactionStatus ?
        <div className={styles.successContent}>
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
              <span>&#8358;{Number(successData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
            </div>
            <div>
              <span>Convenience Fee:</span>
              <span>&#8358;{Number(transactionCost).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
            </div>
            <div>
              <span><b>Total:</b></span>
              <span><b>&#8358;{Number(successData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></span>
            </div>
          </div>
          <div className={styles.link}>
            <Link to="/" className={styles.linkHome}>Home</Link>
            <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a>
          </div>
        </div> :
        <div className={styles.failedContent}>
          <p>We were unable to process your transaction, 
            please try again later!</p>  
          <div><Link to="/">&larr; Home</Link></div>
        </div> }
      </div>
    </div>    
)};

export default BuyAirtimeStatus;