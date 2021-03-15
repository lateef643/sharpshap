import formatToCurrency from "../../../utils/formatToCurrency";

import logo from "../../../assets/images/cico-logo.svg";
import success from "../../../assets/images/circle-check.svg";
import printIcon from "../../../assets/images/printer-print.svg";
import whatsappIcon from "../../../assets/images/whatsapp.svg";
import emailIcon from "../../../assets/images/email.svg";

import styles from "./Receipt.module.scss";

const Status = ({ state, loading, handleOnSubmit }) => {
  const formState = {
    accountName: "Lagbaja Nothing for you",
    bankName: "Eco for show",
    accountNumber: "Nathething",
    phone: "08028998989",
    amount: "100000",
    transactionCost: "344",
    total: "2000000",
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="" />
      </div>
      <div className={styles.heading}>
        <div className={styles.headingIconContainer}>
          <img className={styles.headingIcon} src={success} alt="" />
        </div>
        <div className={styles.headingText}>Transaction successful.</div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Account Name:</span>
          <span className={styles.contentDetails}>{formState.accountName}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Bank:</span>
          <span className={styles.contentDetails}>{formState.bankName}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Account Number:</span>
          <span className={styles.contentDetails}>
            {formState.accountNumber}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Phone Number:</span>
          <span className={styles.contentDetails}>{formState.phone}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(formState.amount)}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction cost:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(formState.transactionCost)}
          </span>
        </div>
        <div className={`${styles.contentItem} ${styles.total}`}>
          <span className={`${styles.contentHeading} ${styles.totalHeading}`}>
            Total:
          </span>
          <span className={`${styles.contentDetails} ${styles.totalDetails}`}>
            {formatToCurrency(formState.total)}
          </span>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <div className={`${styles.print} ${styles.action}`}>
          <img className={styles.actionIcon} src={printIcon} alt="" />
        </div>
        <div className={`${styles.whatsapp} ${styles.action}`}>
          <img className={styles.actionIcon} src={whatsappIcon} alt="" />
        </div>
        <div className={`${styles.email} ${styles.action}`}>
          <img className={styles.actionIcon} src={emailIcon} alt="" />
        </div>
        <div className={`${styles.email} ${styles.action}`}>
          <img className={styles.actionIcon} src={emailIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Status;
