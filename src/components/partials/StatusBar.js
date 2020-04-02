import React from "react";
import "./StatusBar.scss";
import { connect } from "react-redux";

export const StatusBar = ({ page, walletBalance }) => {
  return (
    <div className="statusbar">
      <p className="statusbar__text">{page.heading}{page.sub ? <span> > {page.sub}</span> : undefined}</p>
      <input className="search" type="text" placeholder="Search" style={{visibility: page.search ? 'visible' : 'hidden'}}/>
      <p className="statusbar__text">Wallet Balance: &#8358;{walletBalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
      <p className="statusbar__text">Transaction Value: &#8358;0.00</p>
    </div>
)};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    walletBalance: state.auth.wallet.current_bal
  }
};

export default connect(mapStateToProps, undefined)(StatusBar);