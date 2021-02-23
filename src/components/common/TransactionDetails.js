import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cico from "../../assets/images/cico-logo-login.svg";
import styles from "./TransactionDetails.module.scss";
import { setCurrentPage } from "../../actions/page";
import email from "../../assets/images/email.svg";
import whatsapp from "../../assets/images/whatsapp.svg";

export const TransactionDetails = ({ changeCurrentPage, match }) => {
  const [transaction, setTransaction] = useState({});
  const [transtype, setTranstype] = useState({});

  useEffect(() => {
    const transactions = JSON.parse(sessionStorage.getItem("transactions"));
    const transactionItem = transactions.find((transaction) => {
      return transaction.reference === match.params.id;
    });

    setTransaction(transactionItem);
    setTranstype(transactionItem.transtype);
  }, []);

  useEffect(() => {
    changeCurrentPage({
      heading: "Transaction Details",
      search: false,
    });
  });

  return (
    <div className={styles.section}>
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={cico} alt="cico logo" />
        <p className={styles.headingText}>Transaction Details</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.successContent}>
          <div className={styles.transactionDetails}>
            <div>
              <span>Status:</span>
              <span>{transaction.status}</span>
            </div>
            <div>
              <span>Reference:</span>
              <span>{transaction.reference}</span>
            </div>
            <div>
              <span>Type:</span>
              <span>
                {transtype
                  ? transtype.name
                  : transaction.type === "12"
                  ? "Commission"
                  : transaction.type === "0"
                  ? "Reversal"
                  : transaction.type === "10"
                  ? "Bet"
                  : transaction.type === "11"
                  ? "Cashcall"
                  : "Nil"}
              </span>
            </div>
            <div>
              <span>Customer:</span>
              <span className={styles.customerInfo}>
                {transaction.customer_info}
              </span>
            </div>
            {transaction.type == "7" ? (
              <div>
                <span>Session ID:</span>
                <span>{transaction.retrieval_reference}</span>
              </div>
            ) : transaction.type == "1" ? (
              <div>
                <span>Token:</span>
                <span>{transaction.energy_token}</span>
              </div>
            ) : undefined}
            <div>
              <span>Date:</span>
              <span>{transaction.created_at}</span>
            </div>
          </div>
          <div className={styles.transactionAmount}>
            <div>
              <span>Amount:</span>
              <span>
                &#8358;
                {Number(transaction.amount)
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </span>
            </div>
            <div className={styles.total}>
              <span>Total:</span>
              <span>
                &#8358;
                {Number(transaction.amount)
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </span>
            </div>
          </div>
          <div className={styles.link}>
            <Link to="/" className={styles.linkHome}>
              Go Home
            </Link>
            <div
              onClick={() => window.print()}
              className={styles.linkServiceHome}
            >
              Print
            </div>
          </div>
          <div className={styles.message}>
            <a
              className={styles.messageText}
              href={`mailto:hello@cico.ng?subject=Transaction%20Details&body=ref:${transaction.reference}%20amount=${transaction.amount}%20date=${transaction.created_at}`}
            >
              <img className={styles.messageIcon} src={email} alt="" />
              <span>Email support </span>
            </a>
            <a
              className={styles.messageText}
              href={`https://wa.me/+2349080070040/?text=ref:${transaction.reference} amount=${transaction.amount} date=${transaction.created_at}`}
            >
              <img className={styles.messageIcon} src={whatsapp} alt="" />
              <span>Text support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     uuid: state.auth.user.agent.uuid,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(TransactionDetails);