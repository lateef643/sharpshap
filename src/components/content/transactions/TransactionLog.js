import React, {useEffect, useState } from "react";
import axios from "axios";
import ListLoader from "../../partials/ListLoader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import style from './TransactionLog.module.scss';
import { setCurrentPage } from "../../../actions/page";
import { GET_AGENT_INFO } from "../../../store/api/constants";

export const TransactionLog = ({ changeCurrentPage, uuid }) => {
  const [transactions, setTransactions] = useState([]);
  const [walletInfo, setWalletInfo] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${GET_AGENT_INFO}/${uuid}`)
    .then(res => {
      console.log(res)
      const businessName = res.data.data.agent.business_name;
      const transactions = res.data.data.transaction;
      const walletInfo = res.data.data.wallet;
      setWalletInfo(walletInfo);
      setLoading(false);
      setBusinessName(businessName);
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
      {loading ? <div className={style.loaderContainer}><ListLoader /></div> : undefined}
      {!loading && transactions.length > 0 ? 
        <div className={style.heading}>
          <span className={style.itemOne}>Status</span>
          <span className={style.itemTwo}>Amount</span>
          <span className={style.itemThree}>Previous balance</span>
          <span className={style.itemFour}>Current balance</span>
          <span className={style.itemFive}>Reference</span>
          <span className={style.itemSix}>Type</span>
          <span className={style.itemSeven}>Customer</span>
          <span className={style.itemEight}>Date Created</span>
          <span className={style.itemNine}>Details</span>
        </div> : undefined
      }
      {!loading ? transactions.map((transaction, index) => ( 
        <div key={transaction.id} className={style.log}>
          <span className={style.status}><span className={`${transaction.status === "failed" ? style.failed 
            : transaction.status === "pending" ? style.pending : style.success}`}></span></span>            
          <span className={style.itemTwo}>&#8358;{transaction.amount}</span>
          <span className={style.itemThree}>&#8358;{walletInfo.previous_bal}</span>
          <span className={style.itemFour}>&#8358;{walletInfo.current_bal}</span>
          <span className={style.itemFive}>{transaction.reference}</span>
          <span className={style.itemSix}>{transaction.transtype.name}</span>
          <span className={style.itemSeven}>{transaction.customer_info}</span>
          <span className={style.itemEight}>{transaction.created_at}</span>
          <span className={style.itemNine}>
            <Link to={`/transaction-details/${transaction.reference}`} target="_blank">View Details</Link>
          </span>
        </div> 
        )
      ) : undefined}
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

const mapStateToProps = state => {
  return {
    uuid: state.auth.user.agent.uuid
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionLog);