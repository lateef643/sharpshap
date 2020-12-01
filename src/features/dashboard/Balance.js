import React from "react";
import { connect } from "react-redux";

import formatToCurrency from "../../utils/formatToCurrency";
import refresh from "../../assets/icons/refresh.svg";

import styles from "./Balance.module.scss";

const Balance = ({ walletBalance, refreshOverviewData }) => {
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    walletBalance: state.wallet.balance,
  };
};

export default connect(mapStateToProps)(Balance);
