import React from "react";

import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";
import formatToCurrency from "../../../utils/formatToCurrency";
import styles from "./RechargeCableStatus.module.scss";

var Barcode = require("react-barcode");

export const RechargeCableStatus = (props) => {
  const {
    successData,
    formState,
    transactionCost,
    setComponentToRender,
    service,
  } = props;

  const serviceProviderImageUrl = generateServiceProviderImageUrl(service);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={serviceProviderImageUrl} alt="" />
      </div>
      <div className={styles.indentEffect}>
        <span className={styles.indentEffectLeft}></span>
        <span className={styles.indentEffectRight}></span>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction Reference:</span>
          <span className={styles.contentDetails}>
            {successData.transactionRef}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Provider:</span>
          <span className={styles.contentDetails}>{service}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Plan:</span>
          <span className={styles.contentDetails}>
            {formState.selectedPlanCode}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Smartcard:</span>
          <span className={styles.contentDetails}>
            {formState.smartCardNumber}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Date:</span>
          <span className={styles.contentDetails}>{successData.date}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(successData.amount)}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Convenience Fee:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(transactionCost)}
          </span>
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.totalHeading}>Total:</span>
        <span className={styles.totalDetails}>
          &#8358;{formatToCurrency(successData.amount)}
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

export default RechargeCableStatus;
