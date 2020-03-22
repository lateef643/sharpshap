import React from "react";
import "./StatusBar.scss";
// import icon from "../../assets/images/loupe.svg";

const StatusBar = (props) => (
  <div className="statusbar">
    <p className="statusbar__text">Services</p>
    {/* <img src={icon} className="searchIcon" /> */}
    <input className="search" type="text" placeholder="Search" />
    <p className="statusbar__text">Wallet Balance: &#8358;154,000</p>
    <p className="statusbar__text">Transaction Value: &#8358;255,000</p>
  </div>
);

export default StatusBar;