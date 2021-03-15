import React, { useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import print from "../../../../assets/icons/printer-print.svg";
import cloudbet from "../../../../assets/icons/cloudbet.jpg";
import symbol from "../../../../assets/images/x-symbol-svgrepo-com.svg";

import styles from "./BetslipModal.module.scss";

var Barcode = require("react-barcode");

const BetslipModal = ({ receiptState }) => {
  const [receipt, setReceipt] = useState(receiptState);
  return (
    <div className={styles.bettingReceipt}>
      <img src={cloudbet} alt="cloudbet logo" />
      <p className={styles.betType}>
        <p>Type:</p>
        <p>{receipt.bet_type}</p>
      </p>
      <div className={styles.selection}>
        <p className={styles.selectionHeading}>Your selection</p>
        {receipt.stakes.map((bet, index) => {
          return (
            <div key={bet.selectedOutcomeOdds} className={styles.selectionOdds}>
              <p>{bet.match}</p>
              <p>@</p>
              <p>{bet.total_odds}</p>
            </div>
          );
        })}
      </div>
      <div>
        <p>Bet code</p>
        <p>{receipt.orderNumber}</p>
      </div>
      <div className={styles.orderDate}>
        <p className={styles.orderDateHeading}>Date</p>
        <p className={styles.orderDateContent}>{receipt.orderDate}</p>
      </div>
      <div className={styles.possibleWin}>
        <p>Possible win</p>
        <p>&#8358;{receipt.possibleWin}</p>
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
    receiptState: state.modal.state,
  };
};

export default connect(mapStateToProps)(BetslipModal);
