import React from "react";
import { Link } from "react-router-dom";

import generateServiceImageUrl from "./generateNetworkImageUrl";
import formatToCurrency from "../../../utils/formatToCurrency";

import styles from "./BuyAirtimeCompleted.module.scss";

var Barcode = require("react-barcode");

export const BuyAirtimeCompleted = (props) => {
  const {
    successData,
    service,
    setComponentToRender,
    AirtimePurchaseFormState,
  } = props;

  const { phone, amount } = AirtimePurchaseFormState;

  //Dynamically render bank logo
  let networkImageUrl = generateServiceImageUrl(service);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={networkImageUrl} alt="" />
      </div>
      <div className={styles.indentEffect}>
        <span className={styles.indentEffectLeft}></span>
        <span className={styles.indentEffectRight}></span>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Phone Number:</span>
          <span className={styles.contentDetails}>{phone}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction:</span>
          <span className={styles.contentDetails}>Airtime Purchase</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Network:</span>
          <span className={styles.contentDetails}>{service}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(amount)}
          </span>
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.totalHeading}>Total:</span>
        <span className={styles.totalDetails}>
          &#8358;{formatToCurrency(amount)}
        </span>
      </div>
      <div className={styles.barCodeContainer}>
        <Barcode
          value="https://www.cico.ng"
          width={1.21}
          height={50}
          marginTop={20}
          displayValue={false}
        />
      </div>
      <div className={styles.action}>
        <div
          className={`${styles.buttonAction} ${styles.buttonHome}`}
          onClick={() => window.print()}
        >
          Print
        </div>
        <button
          onClick={() => setComponentToRender("form")}
          className={`${styles.buttonAction} ${styles.buttonRestart}`}
        >
          New Payment
        </button>
      </div>
    </div>
  );
};

export default BuyAirtimeCompleted;
