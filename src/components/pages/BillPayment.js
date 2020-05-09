import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../actions/page";
import Card from "../shared/Card";
import data from "../../assets/images/internet-phone.svg";
import cabletv from "../../assets/images/cabletv.svg";
import power from "../../assets/images/electricity.svg";
import insurance from "../../assets/images/insurance-outlined.svg";
import books from "../../assets/images/books-outline.svg";
import airtime from "../../assets/images/phone-svgrepo-com.svg";
import styles from "./BillPayment.module.scss";

export const BillPayment = ({ changeCurrentPage }) => {

  useEffect(() => {
    changeCurrentPage({
      heading: "Bill Payment",
      search: true
    });    
  }, [changeCurrentPage]);
  
  return (
  <div className={styles.container}>
    <div className={styles.cardContainer}>
      <Card link="recharge-cable" text="Recharge Cable" size="large" image={cabletv} />
      <Card link="pay-electricity" text="Pay Electricity" size="large" image={power} />
      <Card link="buy-insurance" text="Buy Insurance" size="large" image={insurance}  />
      <Card link="education" text="Education" size="large" image={books} />
    </div>
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(BillPayment);