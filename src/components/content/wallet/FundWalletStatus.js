import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import check from "../../../assets/images/check.svg";
import styles from './FundWalletStatus.module.scss';

export const FundWalletStatus = ({ transactionStatus, transactionCost, amount,
successPayload}) => { 
  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer} >
        <div className={styles.imageContainer}>
          <img src={check} alt="checkmark" />
          <p>Funding request successful</p>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <p>Your wallet funding request has been recieved and our representative will 
              validate your request shortly.</p>  
            <div><Link to="/">&larr; Home</Link></div>
          </div>
        </div>
      </div>    
    </div>
)};

export default FundWalletStatus;