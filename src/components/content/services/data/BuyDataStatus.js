import React from "react";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import styles from './BuyDataStatus.module.scss';
import formatToCurrency from "../../../../util/formatToCurrency";

export const BuyDataStatus = (props) => {
  const { successData, transactionCost, setComponentToRender } = props;

  return (
    <div className={styles.section} >
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={check} alt="checkmark" />
        <p className={styles.headingText}>Transaction Successful</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.transactionDetails}>
          <div>
            <span>Transaction Reference:</span>
            <span>{successData.tranxReference}</span>   
          </div>
          <div>
            <span>Network:</span>
            <span>{successData.network}</span>   
          </div>
          <div>
            <span>Type:</span>
            <span>Data Purchase</span>   
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
            <span>{formatToCurrency(successData.amount)}</span>
          </div>
          <div>
            <span>Convenience Fee:</span>
            <span>{formatToCurrency(transactionCost)}</span>
          </div>
          <div>
            <span>Total:</span>
            <span>{formatToCurrency(successData.amount)}</span>
          </div>
        </div>
        <div className={styles.link}>
          <Link to="/" className={styles.linkHome}>Home</Link>
          <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a>
        </div>
      </div>
    </div>    
)};

export default BuyDataStatus;