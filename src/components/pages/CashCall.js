import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../actions/page";
import Card from "../shared/Card";
import postcash from "../../assets/images/postcash.png";
import viewcash from "../../assets/images/viewcash.png";
import acceptcash from "../../assets/images/acceptcash.png";
import styles from "./CashCall.module.scss";

export const CashCall = ({ changeCurrentPage }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Cash-call",
      search: true,
    });
  }, [changeCurrentPage]);

  return (
    <div className={styles.container}>
      <h2 className={styles.cashcallHeader}>What will you like to do?</h2>
      <div className={styles.cardContainer}>
        <Card
          link="cash-call/1"
          text="Post cash"
          size="large"
          image={postcash}
        />
        <Card
          link="cash-call/2"
          text="Accept Cash call"
          size="large"
          image={acceptcash}
        />
        <Card
          link="cash-call/3"
          text="My Transactions"
          size="large"
          image={viewcash}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(CashCall);
