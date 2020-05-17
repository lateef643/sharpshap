import React from "react";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import styles from './ElectricityPaymentCompleted.module.scss';

export const ElectricityPaymentCompleted = ({ formState, setComponentToRender }) => { 
  const { disco, meterNo, accountName, paymentPlan, amount, phoneNo} = formState;
  
  return (
    <div className={styles.section}>
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={check} alt="checkmark" />
        <p className={styles.headingText}>Transaction Successful</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.transactionDetails}>
          <div>
            <span>Disco:</span>
            <span>{disco}</span>  
          </div>
          <div>
            <span>Meter No:</span>
            <span>{meterNo}</span>  
          </div>
          <div>
            <span>Account Name</span>
            <span>{accountName}</span>  
          </div>
          <div>
            <span>Plan:</span>
            <span>{paymentPlan}</span>  
          </div>
          <div>
            <span>Amount:</span>
            <span>{amount}</span>  
          </div>
        </div>
        <div className={styles.transactionAmount}>
          <div>
            <span>Amount:</span>
            <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
          </div>
          <div>
            <span>Convenience Fee:</span>
            <span>&#8358;{Number(0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
          </div>
          <div className={styles.total}>
            <span>Total:</span>
            <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
          </div>
        </div>
          <div className={styles.link}>
            <Link to="/" className={styles.linkHome}>Home</Link>
            <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a>
          </div>
        </div>
      </div>
)};

export default ElectricityPaymentCompleted;