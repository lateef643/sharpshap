import React from "react";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import cross from "../../../../assets/images/redCross.svg";
import styles from './WalletTransferStatus.module.scss';

export const WalletTransferStatus = ({ successData, transactionStatus, setComponentToRender }) => { 
  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer} >
        <div className={styles.imageContainer}>
          <img src={transactionStatus ? check : cross} alt="checkmark" />
          {transactionStatus ? <p>Transaction Successful</p> : <p>Transaction Failed</p>}
        </div>
        <div className={styles.contentContainer}>
          {transactionStatus ? 
            <div>
              <div>
                <span>Reference:</span>
                <span>{successData.reference}</span>
              </div>
              <div>
                <span>Recipient:</span>
                <span>{successData.customer_info}</span>
              </div>
              <div>
                <span>Transaction:</span>
                <span>{successData.mode}</span>
              </div>
              <div>
                <span>Date:</span>
                <span>{successData.date}</span>
              </div>
              <div>
                <span><b>Amount:</b></span>
                <span><b>&#8358;{Number(successData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></span>  
              </div>
              <div className={styles.link}>
                <Link to="/" className={styles.linkHome}>Home</Link>
                <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a>
              </div>
            </div>  
          : <div className={styles.failed}>
              <p>We were unable to process your transaction, 
                please try again later!</p>  
              <div><Link to="/">&larr; Home</Link></div>
            </div>
        }
        </div>
      </div>    
    </div>
)};

export default WalletTransferStatus;