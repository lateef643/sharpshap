import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import cross from "../../../../assets/images/redCross.svg";
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
                <span>Agent ID:</span>
                <span>{successPayload.agentId}</span>
              </div>
              <div>
                <span>Wallet ID:</span>
                <span>{successPayload.wallet_id}</span>
              </div>
              <div>
                <span>Current Balance:</span>
                <span>&#8358;{Number(successPayload.current_bal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
              </div>
              <div>
                <span>Date:</span>
                <span>{successPayload.created_at}</span>
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