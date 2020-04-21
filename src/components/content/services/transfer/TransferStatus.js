import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import cross from "../../../../assets/images/redCross.svg";
import styles from './TransferStatus.module.scss';

export const TransferStatus = ({ transactionStatus, total, transactionCost, amount,
successData}) => { 
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
              <div>
                <span>Amount:</span>
                <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
              </div>
              <div>
                <span>Convenience Fee:</span>
                <span>&#8358;{Number(transactionCost).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
              </div>
              <div className={styles.total}>
                <span><b>Total:</b></span>
                <span><b>&#8358;{Number(total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></span>  
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

export default TransferStatus;