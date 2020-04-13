import React, { useEffect, useState } from "react";
import axios from "axios";
import ListLoader from "../../partials/ListLoader";
import { connect } from "react-redux";
import { setCurrentPage } from "../../../actions/page";
import { ALL_WALLET_LOGS } from "../../../store/api/constants";
import style from './WalletLog.module.scss';

export const WalletLog = ({ changeCurrentPage }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(ALL_WALLET_LOGS)
    .then((res) => {
      const logs = res.data.data.data;
      setLogs(logs);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })    
  }, []);

  useEffect(() => {
    changeCurrentPage({
      heading: "Wallet Log",
      search: true
    });    
  }, [changeCurrentPage]);

  return (
    <div className={style.container}>
      {loading ? <div className={style.loaderContainer}><ListLoader /></div> : undefined}
      {!loading && logs.length > 0 ? 
      <div className={style.heading}>
        <span className={style.itemOne}>Previous Balance</span>
        <span className={style.itemTwo}>Amount</span>
        <span className={style.itemThree}>Current Balance</span>
        <span className={style.itemFour}>Description</span>
        <span className={style.itemFive}>Type</span>
        <span className={style.itemSix}>Mode</span>
        <span className={style.itemSeven}>Date Created</span>
      </div> : undefined}
      {!loading ? logs.map((log, index) => ( 
        <div key={log.id} className={style.log}>
          <span className={style.itemOne}>&#8358;{log.previous_bal}</span>
          <span className={style.itemTwo}>&#8358;{log.amount}</span>
          <span className={style.itemThree}>&#8358;{log.current_bal}</span>
          <span className={style.itemFour}>{log.description}</span>
          <span className={style.itemFive}>{log.type}</span>
          <span className={style.itemSix}>{log.mode}</span>
          <span className={style.itemSeven}>{log.created_at}</span>
        </div> 
        )
      ) : undefined}
  </div>
)}

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(WalletLog);