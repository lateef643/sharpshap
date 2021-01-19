import React from "react";

import formatToCurrency from "../../../utils/formatToCurrency";
import { ThreeDots } from "svg-loaders-react";

import logo from "../../../assets/icons/cico-logo-regular.svg";

import styles from "./WalletTransferSummary.module.scss";

var Barcode = require("react-barcode");

export const WalletTransferSummary = ({
  state,
  loading,
  handleWalletTransfer,
}) => {
  const { amount, wallet_id, agent_name } = state;

  return (
    <div className={styles.container}>
      {/* <div className={styles.logoContainer}>
        <img className={styles.bankLogo} src={logo} alt="" />
      </div> */}
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>AccountWallet ID:</span>
          <span className={styles.contentDetails}>{wallet_id}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>AccountAgent Name:</span>
          <span className={styles.contentDetails}>{agent_name}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>AccountAmount:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(amount)}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>
            AccountTransaction Cost:
          </span>
          <span className={styles.contentDetails}>{formatToCurrency(0)}</span>
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.totalHeading}>Total:</span>
        <span className={styles.totalDetails}>
          {formatToCurrency(state.amount)}
        </span>
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
          handleWalletTransfer();
        }}
        className={styles.button}
      >
        {loading ? <ThreeDots /> : "Proceed"}
      </button>
    </div>
  );
};

export default WalletTransferSummary;
