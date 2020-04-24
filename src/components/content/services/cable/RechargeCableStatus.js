import React from "react";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import cross from "../../../../assets/images/redCross.svg";
import styles from './RechargeCableStatus.module.scss';

export const RechargeCableStatus = ({ successData, smartCardNumber, provider, plan, transactionStatus, setComponentToRender }) => {
  
  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer} >
        <div className={styles.imageContainer}>
          <img src={transactionStatus ? check : cross} alt="transaction status icon" />
          <p>{transactionStatus ? "Transaction Successful" : "Transaction Failed"}</p>
        </div>
        <div className={styles.contentContainer}>
          {transactionStatus ?
          <div>
            <div>
              <span>Transaction Reference:</span>
              <span>{successData.transactionRef}</span>   
            </div>
            <div>
              <span>Provider:</span>
              <span>{provider}</span>   
            </div>
            <div>
              <span>Plan:</span>
              <span>{plan}</span>   
            </div>
            <div>
              <span>Smartcard:</span>
              <span>{smartCardNumber}</span>   
            </div>
            <div>
              <span>Date:</span>
              <span>{successData.date}</span>   
            </div>
            <div>
              <span>Amount:</span>
              <span>&#8358;{Number(successData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
            </div>
            <div className={styles.link}>
            <Link to="/" className={styles.linkHome}>Home</Link>
              <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a>
            </div>
          </div> :
          <div className={styles.failed}>
            <p>We were unable to process your transaction, 
              please try again later!</p>  
            <div><Link to="/">&larr; Home</Link></div>
          </div> }
        </div>
      </div>    
    </div>
)};

export default RechargeCableStatus;