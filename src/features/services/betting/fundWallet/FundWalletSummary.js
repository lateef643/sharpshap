import React from "react";
import PropTypes from "prop-types";

// import generateBankImageUrl from "./generateBankImageUrl";
import cloudbet from "../../../../assets/icons/cloudbet.png";
import formatToCurrency from "../../../../utils/formatToCurrency";
import { ThreeDots } from "svg-loaders-react";

import styles from "./FundWalletSummary.module.scss";

var Barcode = require("react-barcode");

export const FundWalletSummary = (props) => {
  const {
    FundWalletFormState,
    loading,
    handleOnSubmit,
    transactionCost,
  } = props;
  const { phone, accountId, amount } = FundWalletFormState;

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.bankLogo} src={cloudbet} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Account ID:</span>
          <span className={styles.contentDetails}>{accountId}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Phone Number:</span>
          <span className={styles.contentDetails}>{phone}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Type:</span>
          <span className={styles.contentDetails}>Wallet funding</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(amount)}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction cost:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(transactionCost)}
          </span>
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.totalHeading}>Total:</span>
        <span className={styles.totalDetails}>{formatToCurrency(amount)}</span>
      </div>
      <Barcode
        value="https://www.cico.ng"
        width={1.25}
        height={50}
        marginTop={30}
        fontSize={16}
        displayValue={false}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
        className={styles.button}
      >
        {loading ? <ThreeDots /> : "Proceed"}
      </button>
    </div>
  );
};

FundWalletSummary.propTypes = {
  WalletFundingFormState: PropTypes.object,
  loading: PropTypes.bool,
  handleOnSubmit: PropTypes.func,
  transactionCost: PropTypes.number,
};

export default FundWalletSummary;
