import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import cross from "../../../../assets/images/redCross.svg";
import styles from './FundWalletStatus.module.scss';

export const FundWalletStatus = ({ requestStatus }) => { 
  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer} >
        <div className={styles.imageContainer}>
          <img src={requestStatus ? check : cross} alt="checkmark" />
          <p>{requestStatus ? "Funding request successful" : "Funding request failed"}</p>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <p>{requestStatus ? "Your wallet funding request has been recieved and our representative will validate your request shortly." 
            : "Your wallet funding request failed please try again later."}</p>  
            <div><Link to="/">&larr; Home</Link></div>
          </div>
        </div>
      </div>    
    </div>
)};

export default FundWalletStatus;