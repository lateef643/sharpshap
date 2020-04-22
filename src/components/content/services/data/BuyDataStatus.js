import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import cross from "../../../../assets/images/redCross.svg";
import styles from './BuyDataStatus.module.scss';

export const BuyDataStatus = ({ successData, transactionStatus }) => {
  const { amount, tranxReference, tranxDate, recipient, network} = successData;
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
              <span>{tranxReference}</span>   
            </div>
            <div>
              <span>Network:</span>
              <span>{network}</span>   
            </div>
            <div>
              <span>Recipient:</span>
              <span>{recipient}</span>   
            </div>
            <div>
              <span>Date:</span>
              <span>{tranxDate}</span>   
            </div>
            <div>
              <span>Amount:</span>
              <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
            </div>
            <div className={styles.link}>
              <div><Link to="/">&larr; Home</Link></div>
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

export default BuyDataStatus;