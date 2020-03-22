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

const Dashboard = (props) => (
  <div className="dashboard">
    <div className="dashboard-container">
      <Card text="Withdraw Money" image={withdrawal} />
      <Card text="Transfer Funds" image={transfer} />
      <Card text="Pay Electricity" image={power} />
      <Card text="Buy Airtime" image={airtime} />
      <Card text="Recharge Cable TV" image={cabletv} />
      <Card text="Buy Data" image={data} />
      <Card text="Buy Insurance" image={insurance}  />
      <Card text="JAMB" image={jamb} />
      <Card text="WAEC" image={waec} />     
    </div>
  </div>
);

export default Dashboard;