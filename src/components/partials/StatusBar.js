import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { GET_AGENT_INFO } from "../../store/api/constants";
import "./StatusBar.scss";

export const StatusBar = ({ page, walletBalance, history, uuid  }) => {
  const [balance, setBalance] = useState(walletBalance);

  useEffect(() => {
    setInterval(() => {
      axios.get(`${GET_AGENT_INFO}/${uuid}`)
      .then((res) => {
        const balance = res.data.data.wallet.current_bal;
        setBalance(balance);
      })
      .catch((err) => {
        console.log(err);
      })        
    }, 300000);
  }, []);

  return (
    <div className="statusbar">
      <p className="statusbar__links">
        <Link to="/">Home</Link>
        {page.heading ? <span>&nbsp;/ {page.heading}</span> : undefined}
        {page.sub ? <span>&nbsp;/ {page.sub}</span>: undefined}
      </p>
      <input className="search" type="text" placeholder="Search" style={{visibility: page.search ? 'visible' : 'hidden'}}/>
      <p className="statusbar__text">Wallet Balance: &#8358;{balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
      <p className="statusbar__text">Transaction Value: &#8358;0.00</p>
    </div>
)};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    walletBalance: state.auth.walletBalance,
    uuid: state.auth.user.agent.uuid
  }
};

export default connect(mapStateToProps, undefined)(withRouter(StatusBar));