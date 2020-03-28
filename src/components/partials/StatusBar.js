import React from "react";
import "./StatusBar.scss";
import { connect } from "react-redux";
// import icon from "../../assets/images/loupe.svg";

export const StatusBar = ({ page }) => {
  return (
  <div className="statusbar">
    <p className="statusbar__text">{page.heading}</p>
    {/* <img src={icon} className="searchIcon" /> */}
    <input className="search" type="text" placeholder="Search" style={{visibility: page.input ? 'visible' : 'hidden'}}/>
    <p className="statusbar__text">Wallet Balance: &#8358;154,000</p>
    <p className="statusbar__text">Transaction Value: &#8358;255,000</p>
  </div>
)};

const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}

export default connect(mapStateToProps, undefined)(StatusBar);