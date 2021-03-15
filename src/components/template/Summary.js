import Submit from "../../../components/common/Button";

import formatToCurrency from "../../../utils/formatToCurrency";

import info from "../../../assets/images/tooltip-icon.svg";

import styles from "./Summary.module.scss";

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
      <div className={styles.heading}>
        <div className={styles.headingIconContainer}>
          <img className={styles.headingIcon} src={info} alt="" />
        </div>
        <div className={styles.headingText}>
          Verify the information before proceeding.
        </div>
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

      <Submit
        onClick={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {loading ? "Loading" : "Proceed"}
      </Submit>
    </div>
  );
};

export default Status;
