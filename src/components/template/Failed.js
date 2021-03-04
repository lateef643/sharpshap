import React from "react";
import formatToCurrency from "../../../utils/formatToCurrency";

import logo from "../../../assets/images/cico-logo.svg";
import failed from "../../../assets/images/circle-cross.svg";
import printIcon from "../../../assets/images/printer-print.svg";
import whatsappIcon from "../../../assets/images/whatsapp.svg";
import emailIcon from "../../../assets/images/email.svg";

import styles from "./Failed.module.scss";

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
          <img className={styles.headingIcon} src={failed} alt="" />
        </div>
        <div className={styles.headingText}>Transaction failed.</div>
      </div>
      <div className={styles.content}>
        <div className={styles.note}>
          Lorem ipsum dolor si amet something something something something
          something something something something.
        </div>
        <div className={styles.note}>
          Lorem ipsum dolor si amet something something something something
          something something something something.
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
