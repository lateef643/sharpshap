import React from "react";
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

const Dashboard = (props) => {
  const transactions = [{
    status: "success",
    amount: 500,
    reference: "428333",
    type: "Airtime",
    customer: "naruto@covid.com",
    agent: "Saitama",
    vendor: "Goku",
    terminal: "jp8738",   
  }, {
    status: "failed",
    amount: 5600900,
    reference: "428333",
    type: "Transfer",
    customer: "naruto@covid.com",
    agent: "Saitama",
    vendor: "Goku",
    terminal: "jp8738"    
  }];
  transactions.length = 5;
  transactions.fill({
    status: "pending",
    amount: 56500,
    reference: "428333",
    type: "Airtime",
    customer: "naruto@covid.com",
    agent: "Saitama",
    vendor: "Goku",
    terminal: "jp8738",   
  }, 2, 5);
  
  return (
  <div className={style.dashboard}>
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
      <p className={style.transactionsCount}>Last five transactions</p>
      <div className={style.transactionsHeading}>
        <span>Status</span>
        <span>Transaction Type</span>
        <span>Amount(&#8358;)</span>
        <span>Terminal</span>        
      </div>
      {transactions.map((transaction, index) => ( 
        <div key={index} className={style.transactions}>
          <span className={style.status}><span className={`${transaction.status === "failed" ? style.failed 
            : transaction.status === "pending" ? style.pending : style.success}`}></span></span>            
          <span>{transaction.type}</span>
          <span>&#8358;{transaction.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          <span>{transaction.terminal}</span>
        </div> 
        )
      )}
    </div>
  </div>
)};

export default Dashboard;