import React from "react";
import { connect } from "react-redux";

import flexShield from "../../assets/icons/bronze-badge.svg";
import premiumShield from "../../assets/icons/silver-badge.svg";
import vipShield from "../../assets/icons/gold-badge.svg";

import formatToCurrency from "../../utils/formatToCurrency";
import refresh from "../../assets/icons/refresh.svg";

import styles from "./Balance.module.scss";

const Balance = ({
  walletBalance,
  refreshOverviewData,
  agentClassification,
}) => {
  const agentClassificationLowercase = agentClassification.toLowerCase();
  const agentClassificationIcon =
    agentClassificationLowercase === "premium"
      ? premiumShield
      : agentClassificationLowercase === "vip"
      ? vipShield
      : flexShield;
  const agentClassificationText =
    agentClassificationLowercase === "premium"
      ? "Premium Agent"
      : agentClassificationLowercase === "vip"
      ? "VIP Agent"
      : "Flex Agent";

  const handleOnClick = () => {
    refreshOverviewData();
  };

  return (
    <div className={styles.balance}>
      <div className={styles.balanceWrapper}>
        <p className={styles.balanceHeading}>Wallet Balance:</p>
        <h3 className={styles.balanceText}>
          ₦{formatToCurrency(walletBalance)}
          <img
            className={styles.refresh}
            src={refresh}
            alt=""
            onClick={handleOnClick}
          />
        </h3>
      </div>
      <div className={styles.agentCategory}>
        <img
          className={styles.agentCategoryImage}
          src={agentClassificationIcon}
          alt=""
        />
        <p className={styles.agentCategoryText}>{agentClassificationText}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    walletBalance: state.wallet.balance,
    agentClassification: state.auth.user.agentClassification,
  };
};

export default connect(mapStateToProps)(Balance);
