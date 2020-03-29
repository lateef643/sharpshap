import React from "react";
import { connect } from "react-redux";
import Card from "../../shared/Card";
import style from "./NewTransaction.module.scss";
import withdrawal from "../../../assets/images/withdrawal.svg";
import cabletv from "../../../assets/images/cable-tv-sign-with-monitor.svg";
import power from "../../../assets/images/power.svg";
import transfer from "../../../assets/images/transfer.svg";
import data from "../../../assets/images/smartphone-data.svg";
import insurance from "../../../assets/images/surface1.svg";
import airtime from "../../../assets/images/smartphone-call.svg";
import waec from "../../../assets/images/WAEC_LogoPNG@2x.svg";
import jamb from "../../../assets/images/Institutions Not Showing (Blank) in CAPS Reasons and Solutions@2x.svg";
import { setCurrentPage } from "../../../actions/page";

export const NewTransaction = ({ changeCurrentPage }) => {
  changeCurrentPage({
    heading: "New Transaction",
    search: false
  });

  return (
  <div className={style.container}>
    <div className={style.cardContainer}>
      <Card link="withdraw" text="Withdraw Money" image={withdrawal} />
      <Card link="transfer" text="Transfer Funds" image={transfer} />
      <Card link="pay-electricity" text="Pay Electricity" image={power} />
      <Card link="buy-airtime" text="Buy Airtime" image={airtime} />
      <Card link="recharge-cable" text="Recharge Cable TV" image={cabletv} />
      <Card link="buy-data" text="Buy Data" image={data} />
      <Card link="buy-insurance" text="Buy Insurance" image={insurance}  />
      <Card link="jamb" text="JAMB" image={jamb} />
      <Card link="waec" text="WAEC" image={waec} />     
    </div>
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(NewTransaction);