import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { ALL_WALLET_LOGS } from "../../store/api/constants";
import "./StatusBar.scss";

export const StatusBar = ({ page, walletBalance  }) => {
  const [balance, setBalance] = useState(walletBalance);

  useEffect(() => {
    setInterval(() => {
      axios.get(ALL_WALLET_LOGS)
      .then((res) => {
        const logs = res.data.data.data;
        let balance;
        
        if (logs.length > 0) {
          balance = logs[0].current_bal
        }

        setBalance(balance);
      })
      .catch((err) => {
        console.log(err);
      })        
    }, 300000);
  }, []);

  return (
    <div className="statusbar">
      <p className="statusbar__text">{page.heading}{page.sub ? <span> > {page.sub}</span> : undefined}</p>
      <input className="search" type="text" placeholder="Search" style={{visibility: page.search ? 'visible' : 'hidden'}}/>
      <p className="statusbar__text">Wallet Balance: &#8358;{balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
      <p className="statusbar__text">Transaction Value: &#8358;0.00</p>
    </div>
)};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    walletBalance: state.auth.walletBalance
  }
};

export default connect(mapStateToProps, undefined)(StatusBar);