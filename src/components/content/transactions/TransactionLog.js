import React, {useEffect, useState } from "react";
import axios from "axios";
import ListLoader from "../../partials/ListLoader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import style from './TransactionLog.module.scss';
import { setCurrentPage } from "../../../actions/page";
import { setTransactionLog } from "../../../actions/transaction";
import { AGENT_TRANSACTION_HISTORY } from "../../../store/api/constants";

export const TransactionLog = ({ changeCurrentPage, setTransactionsLog, uuid }) => {
  const [transactions, setTransactions] = useState([]);
  const [walletInfo, setWalletInfo] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [lastPage, setLastPage] = useState("");
  const [pageChangeLoading, setPageChangeLoading] = useState(false);
  const firstPage = 1;

  //transactions
  console.log(currentPage)

  useEffect(() => {
    axios.get(`${AGENT_TRANSACTION_HISTORY}?page=${currentPage}`)
    .then(res => {
      const transactions = res.data.data.data;
      const total = res.data.data.total;
      const perPage = res.data.data.per_page;
      const lastPage = res.data.data.last_page;
      let pageNumbers = [];
      console.log(res.data.data)

      if (total !== null && total > 0) {
        for (let i = 1; i <= Math.ceil(total / perPage); i++) {
          pageNumbers.push(i);
        };
        setPageNumbers(pageNumbers);
      }
      // const businessName = res.data.data.agent.business_name;
      // const transactions = res.data.data.transaction;
      // const walletInfo = res.data.data.wallet;
      // setWalletInfo(walletInfo);
      setLoading(false);
      setLastPage(lastPage)
      // setBusinessName(businessName);
      setTransactions(transactions);
      setPageChangeLoading(false);
    })
    .catch(err => {
      console.log(err);
    });
  }, [currentPage]);

  useEffect(() => {
    setTransactionsLog(transactions);
  });

  useEffect(() => {
    changeCurrentPage({
      heading: "Transaction Log",
      search: true
    });    
  }, [changeCurrentPage]);

  return (
    <div className={style.container}>
      {loading || pageChangeLoading ? <div className={style.loaderContainer}><ListLoader /></div> : undefined}
      {!loading && transactions.length > 0 ? 
        <div className={style.heading}>
          <span className={style.itemOne}>Status</span>
          <span className={style.itemTwo}>Amount</span>
          <span className={style.itemThree}>Reference</span>
          <span className={style.itemFour}>Type</span>
          <span className={style.itemFive}>Customer</span>
          <span className={style.itemSix}>Agent</span>
          <span className={style.itemSeven}>Date Created</span>
          <span className={style.itemEight}>Details</span>
        </div> : undefined
      }
      {!loading || !pageChangeLoading ? transactions.map((transaction, index) => ( 
        <div key={transaction.id} className={style.log}>
          <span className={style.status}><span className={`${transaction.status === "failed" ? style.failed 
            : transaction.status === "pending" ? style.pending : style.success}`}></span></span>            
          <span className={style.itemTwo}>&#8358;{transaction.amount}</span>
          <span className={style.itemThree}>{transaction.reference}</span>
          <span className={style.itemFour}>{transaction.transtype.name}</span>
          <span className={style.itemFive}>{transaction.customer_info}</span>
          <span className={style.itemSix}>{transaction.agent.business_name}</span>
          <span className={style.itemSeven}>{transaction.created_at}</span>
          <span className={style.itemEight}>
            <Link to={`/transaction-details/${transaction.reference}`}>View Details</Link>
          </span>
        </div> 
        )
      ) : undefined}
      {!loading ? 
        <div className={style.pagination}>
          <span onClick={() => {
              setPageChangeLoading(true);
              setCurrentPage(1);
            }} 
            className={currentPage === 1 ? style.active : style.normal}>First Page</span>
          <span onClick={() => {
              if (currentPage < lastPage) {
                setCurrentPage(currentPage + 1);
              }
            }} 
          disabled={currentPage === lastPage}>Next Page</span>
         {
          pageNumbers.map((page, index) => {
            return <span key={`${index}--key`}onClick={() => {
              setCurrentPage(page);
              setPageChangeLoading(true);
            }} 
            className={currentPage === page ? style.active : style.normal}>{page}</span>
          })
        } 
          <span onClick={() => {
            if (currentPage > firstPage) {
              setCurrentPage(currentPage - 1);
              setPageChangeLoading(true);
            }
          }}>Prev Page</span>
          <span onClick={() => {
            if (currentPage < lastPage) {
              setCurrentPage(lastPage);
              setPageChangeLoading(true);
            }
         }} 
        className={currentPage === lastPage ? style.active : style.normal}
        disabled={currentPage === lastPage}>Last Page</span>
        </div> : undefined}
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload)),
    setTransactionsLog: payload => dispatch(setTransactionLog(payload))
  }
};

const mapStateToProps = state => {
  return {
    uuid: state.auth.user.agent.uuid
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionLog);