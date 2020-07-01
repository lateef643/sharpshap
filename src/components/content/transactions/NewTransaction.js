import React from "react";
import { connect } from "react-redux";
import Card from "../../shared/Card";
import style from "./NewTransaction.module.scss";
import cabletv from "../../../assets/images/cabletv.svg";
import power from "../../../assets/images/electricity.svg";
import transfer from "../../../assets/images/transfer-outlined.svg";
import data from "../../../assets/images/internet-phone.svg";
import insurance from "../../../assets/images/insurance-outlined.svg";
import airtime from "../../../assets/images/phone-svgrepo-com.svg";
import education from "../../../assets/images/books-outline.svg";
import wallet from "../../../assets/images/wallet-outline.svg";
import betting from "../../../assets/images/football.svg";
import { setCurrentPage } from "../../../actions/page";

export const NewTransaction = ({ changeCurrentPage }) => {
  changeCurrentPage({
    heading: "New Transaction",
    search: false,
  });

  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        <Card
          link="transfer"
          text="Transfer Funds"
          size="large"
          image={transfer}
        />
        <Card
          link="pay-electricity"
          text="Pay Electricity"
          size="large"
          image={power}
        />
        <Card
          link="buy-airtime"
          text="Buy Airtime"
          size="large"
          image={airtime}
        />
        <Card
          link="recharge-cable"
          text="Recharge Cable TV"
          size="large"
          image={cabletv}
        />
        <Card link="buy-data" text="Buy Data" size="large" image={data} />
        <Card
          link="wallet-transfer"
          text="Betting"
          size="large"
          image={betting}
        />
        <Card
          link="wallet-transfer"
          text="Wallet Transfer"
          size="large"
          image={wallet}
        />
        <Card
          link="education"
          text="Education"
          size="large"
          image={education}
        />
        <Card
          link="buy-insurance"
          text="Buy Insurance"
          size="large"
          image={insurance}
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

export default connect(undefined, mapDispatchToProps)(NewTransaction);
