import React, {useEffect, useState } from "react";
import axios from "axios";
import ListLoader from "../../partials/ListLoader";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from './TransactionLog.module.scss';
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
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState("");
  const firstPage = 1;

  useEffect(() => {
    if (typeof filter === "number") {
      const payload = {
        "transaction_type_id": 2
      }

      console.log('this is called')
      console.log(filter)
      axios.get('https://api.cico.ng/api/transactions/filter', payload)
      .then(res => {
        const transactions = res.data.data.data;
        const total = res.data.data.total;
        const perPage = res.data.data.per_page;
        const lastPage = res.data.data.last_page;
        let pageNumbers = [];
        console.log("filtered", res.data.data)
        console.log(res)
  
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
        if (err.response) {
          console.log(err.response.data)
        }
      });
    }
  }, [filter]);

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


  const handleFilterChange = (e) => {
    console.log('this bitch is running')
    const filter = parseInt(e.target.value);
    setFilter(filter);
  }

  return (
    <div className={styles.container}>
    {!loading && transactions.length > 0 ?
      <div className={styles.filters}>
        <div className={styles.dateFilterContainer}>
          <div className={styles.dateFilter}>
            <DateRangePicker
              onChange={date => {
                console.log(date);
                setDate(date);
              }}
              value={date}
            />
          </div>
        </div>
        <div>
          <select onChange={handleFilterChange}>
            <option value="">Filter by transaction type</option>
            <option value="">All transactions</option>
            <option value="2">Transfer</option>
            <option value="3">Airtime</option>
          </select>          
        </div>
      </div> :
      undefined}
      {loading || pageChangeLoading ? <div className={styles.loaderContainer}><ListLoader /></div> : undefined}
      {!loading && transactions.length > 0 ? 
        <div className={styles.heading}>
          <span className={styles.itemOne}>Status</span>
          <span className={styles.itemTwo}>Amount</span>
          <span className={styles.itemThree}>Reference</span>
          <span className={styles.itemFour}>Type</span>
          <span className={styles.itemFive}>Customer</span>
          <span className={styles.itemSix}>Agent</span>
          <span className={styles.itemSeven}>Date Created</span>
          <span className={styles.itemEight}>Details</span>
        </div> : undefined
      }
      {!loading || !pageChangeLoading ? transactions.map((transaction, index) => ( 
        <div key={transaction.id} className={styles.log}>
          <span className={styles.status}><span className={`${transaction.status === "failed" ? styles.failed 
            : transaction.status === "pending" ? styles.pending : styles.success}`}></span></span>            
          <span className={styles.itemTwo}>&#8358;{transaction.amount}</span>
          <span className={styles.itemThree}>{transaction.reference}</span>
          <span className={styles.itemFour}>{transaction.transtype.name}</span>
          <span className={styles.itemFive}>{transaction.customer_info}</span>
          <span className={styles.itemSix}>{transaction.agent.business_name}</span>
          <span className={styles.itemSeven}>{transaction.created_at}</span>
          <span className={styles.itemEight}>
            <Link to={`/transaction-details/${transaction.reference}`}>View Details</Link>
          </span>
        </div> 
        )
      ) : undefined}
      {!loading ? 
        <div className={styles.pagination}>
          <span onClick={() => {
              setPageChangeLoading(true);
              setCurrentPage(1);
            }} 
            className={currentPage === 1 ? styles.active : styles.normal}>First Page</span>
          <span onClick={() => {
              if (currentPage < lastPage) {
                setCurrentPage(currentPage + 1);
              }
            }} 
          disabled={currentPage === lastPage}>Next Page</span>
          <span className={styles.active} disabled>{currentPage}</span>
         {/* {
          pageNumbers.map((page, index) => {
            if (page === 1) {
              return <span key={`${index}--key`}onClick={() => {
                setCurrentPage(page);
                setPageChangeLoading(true);
              }} 
              className={currentPage === page ? styles.active : styles.normal}>{page}</span>              
            }
          })
        }  */}
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
        className={currentPage === lastPage ? styles.active : styles.normal}
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