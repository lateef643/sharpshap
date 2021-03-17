import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import print from "../../../../assets/icons/printer-print.svg";
import cloudbet from "../../../../assets/icons/cloudbet.jpg";
// import symbol from "../../../../assets/images/x-symbol-svgrepo-com.svg";

import styles from "./BetslipModal.module.scss";

var Barcode = require("react-barcode");

const BetslipModal = ({ receipt, name }) => {
  return (
    <div className={styles.bettingReceipt}>
      <img className={styles.logo} src={cloudbet} alt="cloudbet logo" />
      <div className={styles.betInfo}>
        <p className={styles.betInfoItem}>
          <p className={styles.betInfoItemHeading}>Type:</p>
          <p className={styles.betInfoItemDetails}>{receipt.bet_type}</p>
        </p>{" "}
        <p className={styles.betInfoItem}>
          <p className={styles.betInfoItemHeading}>Receipt data:</p>
          <p className={styles.betInfoItemDetails}>{receipt.orderDate}</p>
        </p>
        <p className={styles.betInfoItem}>
          <p className={styles.betInfoItemHeading}>Receipt code:</p>
          <p className={styles.betInfoItemDetails}>{receipt.orderNumber}</p>
        </p>
        <p className={styles.betInfoItem}>
          <p className={styles.betInfoItemHeading}>Agent name:</p>
          <p className={styles.betInfoItemDetails}>{name}</p>
        </p>
      </div>
      <div className={styles.selection}>
        <p className={styles.selectionHeading}>Your selection</p>
        {receipt.stakes.map((bet, index) => {
          return (
            <div key={bet.selectedOutcomeOdds} className={styles.selectionItem}>
              <p className={styles.selectionItemEvent}>{bet.event}</p>
              <div className={styles.selectionItemOdds}>
                <p className={styles.selectionItemOddsMatch}>
                  <b>{bet.match}</b>
                </p>
                <p>@</p>
                <p className={styles.selectionItemOddsOdds}>{bet.total_odds}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.betInfoBottom}>
        <div className={`${styles.betCode} ${styles.betInfoBottomItem}`}>
          <p className={styles.betCodeHeading}>Bet code</p>
          <p className={styles.betCodeDetails}>{receipt.orderNumber}</p>
        </div>
        <div className={`${styles.orderDate}  ${styles.betInfoBottomItem}`}>
          <p className={styles.orderDateHeading}>Date</p>
          <p className={styles.orderDateContent}>{receipt.orderDate}</p>
        </div>
        <div className={`${styles.possibleWin}  ${styles.betInfoBottomItem}`}>
          <p>Possible win</p>
          <p>&#8358;{receipt.possibleWin}</p>
        </div>
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
      <div className={styles.betOptions}>
        <Link to="/betting/bet" className={styles.newBet}>
          New Bet
        </Link>
      </div>
      <div
        className={styles.printSlip}
        onClick={() => {
          window.print();
        }}
      >
        <img src={print} alt="" />
        <span>Print Slip</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    receipt: state.modal.state,
    name: state.auth.user.businessName,
  };
};

export default connect(mapStateToProps)(BetslipModal);
