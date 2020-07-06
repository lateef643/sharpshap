import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../actions/page";
import Card from "../shared/Card";
import cashcall from "../../assets/images/cashcall2.svg";
import styles from "./AirtimeData.module.scss";

export const AirtimeData = ({ changeCurrentPage }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Cash-call",
      search: true,
    });
  }, [changeCurrentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <Card
          link="cash-call/post"
          text="Post cashcall"
          size="large"
          image={cashcall}
        />
        <Card
          link="cash-call/accept"
          text="Accept cashcall"
          size="large"
          image={cashcall}
        />
        <Card
          link="cash-call/view"
          text="View cashcalls"
          size="large"
          image={cashcall}
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

export default connect(undefined, mapDispatchToProps)(AirtimeData);
