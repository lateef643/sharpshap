import React, {useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import style from './TransactionLog.module.scss';
import { setCurrentPage } from "../../../actions/page";
import { ALL_TRANSACTION_LOGS } from "../../../store/api/constants";

export const TransactionLog = ({ changeCurrentPage }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(ALL_TRANSACTION_LOGS)
    .then(res => {
      const transactions = res.data.data.data;
      setTransactions(transactions);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    changeCurrentPage({
      heading: "Transaction Log",
      search: true
    });    
  }, [changeCurrentPage]);

  return (
    <div className={style.container}>
      {transactions.length > 0 ? 
        <div className={style.heading}>
          <span className={style.itemOne}>Status</span>
          <span className={style.itemTwo}>Amount</span>
          <span className={style.itemThree}>Reference</span>
          <span className={style.itemFour}>Type</span>
          <span className={style.itemFive}>Customer</span>
          <span className={style.itemSix}>Agent</span>
          <span className={style.itemSeven}>Vendor</span>
          <span className={style.itemEight}>Terminal</span>
        </div> : undefined
      }
      {transactions.map((transaction, index) => ( 
        <div key={transaction.id} className={style.log}>
          <span className={style.status}><span className={`${transaction.status === "failed" ? style.failed 
            : transaction.status === "pending" ? style.pending : style.success}`}></span></span>            
          <span className={style.itemTwo}>&#8358;{transaction.amount}</span>
          <span className={style.itemThree}>{transaction.reference}</span>
          <span className={style.itemFour}>{transaction.transtype.name}</span>
          <span className={style.itemFive}>{transaction.customer_info}</span>
          <span className={style.itemSix}>{transaction.agent.business_name}</span>
          <span className={style.itemSeven}>{transaction.vendor}</span>
          <span className={style.itemEight}>{transaction.terminal_id}</span>
        </div> 
        )
      )}
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(TransactionLog);