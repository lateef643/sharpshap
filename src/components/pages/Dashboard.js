import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Card from "../shared/Card";
import style from "./Dashboard.module.scss";
import withdrawal from "../../assets/images/withdrawal.svg";
import cabletv from "../../assets/images/cable-tv-sign-with-monitor.svg";
import power from "../../assets/images/power.svg";
import transfer from "../../assets/images/transfer.svg";
import data from "../../assets/images/smartphone-data.svg";
import insurance from "../../assets/images/surface1.svg";
import airtime from "../../assets/images/smartphone-call.svg";
import waec from "../../assets/images/WAEC_LogoPNG@2x.png";
import jamb from "../../assets/images/Institutions Not Showing (Blank) in CAPS Reasons and Solutions@2x.png";
import { setCurrentPage } from "../../actions/page";
import { ALL_TRANSACTION_LOGS } from "../../store/api/constants";

export const Dashboard = ({ changeCurrentPage }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(ALL_TRANSACTION_LOGS)
    .then(res => {
      const transactions = res.data.data.data;
      setTransactions(transactions.splice(transactions.length - 5));
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    changeCurrentPage({
      heading: "Services",
      search: true
    });    
  }, [changeCurrentPage]);
  
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
    <div className={style.transactionsContainer}>
      {transactions.length > 0 ? <p className={style.transactionsCount}>Last five transactions</p> : undefined}
      {transactions.length > 0 ? 
      <div className={style.transactionsHeading}>
        <span>Status</span>
        <span>Transaction Type</span>
        <span>Amount(&#8358;)</span>
        <span>Terminal</span>        
      </div> : undefined}
      {transactions.map((transaction, index) => ( 
        <div key={index} className={style.transactions}>
          <span className={style.status}><span className={`${transaction.status === "failed" ? style.failed 
            : transaction.status === "pending" ? style.pending : style.success}`}></span></span>            
          <span>{transaction.transtype.name}</span>
          <span>&#8358;{transaction.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          <span>{transaction.terminal}</span>
        </div> 
        )
      )}
    </div>
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(Dashboard);