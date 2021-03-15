import React from "react";
import { ThreeDots } from "svg-loaders-react";

import formatToCurrency from "../../../utils/formatToCurrency";
import Submit from "../../../components/common/Button";

import logo from "../../../assets/images/cico-logo.svg";

import back from "../../../assets/images/left-arrow.svg";
import info from "../../../assets/images/tooltip-icon.svg";

import styles from "./WalletTransferSummary.module.scss";

export const WalletTransferSummary = ({
  state,
  loading,
  handleWalletTransfer,
  setStatus,
}) => {
  const { amount, wallet_id, agent_name } = state;

  return (
    <div className={styles.container}>
      <div
        className={styles.back}
        onClick={() => {
          setStatus("form");
        }}
      >
        <img className={styles.backIcon} src={back} alt="" />
        <span className={styles.backText}>Back</span>
      </div>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="" />
      </div>
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
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(0)}
          </span>
        </div>
        <div className={`${styles.contentItem} ${styles.total}`}>
          <span className={`${styles.contentHeading} ${styles.totalHeading}`}>
            Total:
          </span>
          <span className={`${styles.contentDetails} ${styles.totalDetails}`}>
            &#8358;{formatToCurrency(state.amount)}
          </span>
        </div>
      </div>
      <Submit
        disabled={false}
        onClick={(e) => {
          e.preventDefault();
          handleWalletTransfer();
        }}
      >
        {loading ? <ThreeDots fill="white" /> : "Proceed"}
      </Submit>
    </div>
  );
};

export default WalletTransferSummary;
