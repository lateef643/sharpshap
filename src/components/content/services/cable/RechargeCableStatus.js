import React from "react";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import styles from './RechargeCableStatus.module.scss';

export const RechargeCableStatus = (props) => {
  const { successData, smartCardNumber, provider, plan, transactionCost, setComponentToRender } = props;

  return (
    <div className={styles.section} >
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={check} alt="transaction status icon" />
        <p className={styles.headingText}>Transaction Successful</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.transactionDetails}>
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
        </div>
        <div className={styles.transactionAmount}>
          <div>
            <span>Amount:</span>
            <span>&#8358;{Number(successData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          </div>
          <div>
            <span>Convenience Fee:</span>
            <span>&#8358;{Number(transactionCost).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          </div>
          <div>
            <span>Total:</span>
            <span>&#8358;{Number(successData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          </div>
        </div>
        <div className={styles.link}>
          <Link to="/" className={styles.linkHome}>Home</Link>
          <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a>
        </div>
      </div>
    </div>    
)};

export default RechargeCableStatus;