import React from "react";
import Card from "../shared/Card";
import "./Dashboard.scss";
import withdrawal from "../../assets/images/withdrawal.svg";
import cabletv from "../../assets/images/cable-tv-sign-with-monitor.svg";
import power from "../../assets/images/power.svg";
import transfer from "../../assets/images/transfer.svg";
import data from "../../assets/images/smartphone-data.svg";
import insurance from "../../assets/images/surface1.svg";
import airtime from "../../assets/images/smartphone-call.svg";
import waec from "../../assets/images/WAEC_LogoPNG@2x.svg";
import jamb from "../../assets/images/Institutions Not Showing (Blank) in CAPS Reasons and Solutions@2x.svg";

const Dashboard = (props) => {
  // const transactions = [];
  // transactions.fill({
  //   status: 'pending',
  //   amount: "500",
  //   reference: "428333",
  //   type: "Airtime",
  //   customer: "naruto@covid.com",
  //   agent: "Saitama",
  //   vendor: "Goku",
  //   terminal: "jp8738",   
  // }, 0, 5);
  
  return (
  <div className="dashboard">
    <div className="dashboard-container">
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
    {/* <div>
      <p>Last 5 transactions</p>
      {transactions.map((transaction, index) => ( 
        <div key={index} className="activity-log__content">
          <span className={`dashboard__content__status dashboard__content__status--${transaction.status}`}></span>
          <span>{transaction.type}</span>
          <span>{transaction.amount}</span>
        </div> 
        )
      )}
    </div> */}
  </div>
)};

export default Dashboard;