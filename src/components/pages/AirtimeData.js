import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../actions/page";
import Card from "../shared/Card";
import data from "../../assets/images/internet-phone.svg";
import airtime from "../../assets/images/phone-svgrepo-com.svg";
import styles from "./AirtimeData.module.scss";

export const AirtimeData = ({ changeCurrentPage }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Airtime-Data",
      search: true,
    });
  }, [changeCurrentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <Card link="buy-data" text="Buy Data" size="large" image={data} />
        <Card
          link="buy-airtime"
          text="Buy Airtime"
          size="large"
          image={airtime}
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
