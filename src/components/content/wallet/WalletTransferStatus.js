import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import check from "../../../assets/images/check.svg";
import cross from "../../../assets/images/redCross.svg";
import styles from './WalletTransferStatus.module.scss';

export const WalletTransferStatus = ({ successPayload, transactionStatus }) => { 
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
                <span>Agent Name:</span>
                <span>{successPayload.agentName}</span>
              </div>
              <div>
                <span>Agent ID:</span>
                <span>{successPayload.agentId}</span>
              </div>
              <div>
                <span>Amount:</span>
                <span>&#8358;{Number(successPayload.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
              </div>
              <div>
                <span><b>Total:</b></span>
                <span><b>&#8358;{Number(successPayload.total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></span>  
              </div>
              <div className={styles.link}>
                <div><Link to="/">&larr; Home</Link></div>
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