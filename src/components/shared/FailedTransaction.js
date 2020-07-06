import React from "react";
import cross from "../../assets/images/fail.svg";
import { Link } from "react-router-dom";
import styles from "./FailedTransaction.module.scss";

const FailedTransaction = () => (
  <div className={styles.container}>
    <img src={cross} alt="cross icon represents failed transaction" />
    <p>We were unable to process your transaction, please try again later.</p>
    <div>
      <Link to="/">
        <span className={styles.linkHome}>Home</span>
      </Link>
    </div>
  </div>
);

export default FailedTransaction;