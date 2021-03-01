import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DatePicker } from "@material-ui/pickers";
import { startOfYear } from "date-fns";

import formatToCurrency from "../../../utils/formatToCurrency";
import ExportToExcel from "../../../components/common/ExportToExcel";
import styles from "./TransactionLog.module.scss";
import { setCurrentPage } from "../../../actions/page";
import { setTransactionLog } from "../../../actions/transaction";
import { AGENT_TRANSACTION_HISTORY } from "../../../utils/constants";
import "../../../assets/styles/generic/daterangepicker.scss";
import arrowDown from "../../../assets/icons/arrowdown.svg";
import arrowUp from "../../../assets/images/arrowUp.svg";
import menu from "../../../assets/images/dots.svg";
import "./custom-date.css";

export const TransactionLog = ({
  changeCurrentPage,
  setTransactionsLog,
  uuid,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [lastPage, setLastPage] = useState("");
  const [pageChangeLoading, setPageChangeLoading] = useState(false);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [selectedDateFrom, handleSelectedDateFrom] = useState("");
  const [selectedDateTo, handleSelectedDateTo] = useState("");

  const firstPage = 1;

  useEffect(() => {
    setPageChangeLoading(true);

    let formattedDates;
    let from;
    let to;

    if (selectedDateFrom && selectedDateTo) {
      formattedDates = convertDatesToString().split(" ");

      from = formattedDates[0];
      to = formattedDates[1];
    }

    const params = {};

    if (transactionTypeFilter) params.type = transactionTypeFilter;
    if (from) params.from = from;
    if (to) params.to = to;
    if (currentPage) params.page = currentPage;

    (async function getTransactionsLog() {
      try {
        const res = await axios.get(`${AGENT_TRANSACTION_HISTORY}`, { params });

        const transactions = res.data.data.data;
        const total = res.data.data.total;
        const perPage = res.data.data.per_page;
        const lastPage = res.data.data.last_page;
        let pageNumbers = [];

        if (total !== null && total > 0) {
          for (let i = 1; i <= Math.ceil(total / perPage); i++) {
            pageNumbers.push(i);
          }
          setPageNumbers(pageNumbers);
          setLastPage(lastPage);
          // setBusinessName(businessName);
          sessionStorage.setItem("transactions", JSON.stringify(transactions));
          setTransactions(transactions);
        }
      } catch (e) {
        // console.log(e)
      } finally {
        setLoading(false);
        setPageChangeLoading(false);
      }
    })();
  }, [transactionTypeFilter, selectedDateTo, selectedDateFrom, currentPage]);

  //dispatching to redux state because we need transactions log to get transactionDetails
  useEffect(() => {
    setTransactionsLog(transactions);
  });

  useEffect(() => {
    changeCurrentPage({
      heading: "Transaction Log",
      search: true,
    });
  }, [changeCurrentPage]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    let filter;

    if (value) {
      filter = parseInt(e.target.value);
    }

    setTransactionTypeFilter(filter);
  };

  const convertDatesToString = () => {
    if (selectedDateFrom && selectedDateTo) {
      let from = selectedDateFrom;
      let to = selectedDateTo;

      const fromMonth = from.getMonth();
      const toMonth = to.getMonth();
      const fromDate = from.getDate();
      const toDate = to.getDate();
      const fromYear = from.getFullYear();
      const toYear = to.getFullYear();

      const formattedFrom = `${fromYear}-${fromMonth + 1}-${fromDate}`;
      const formattedTo = `${toYear}-${toMonth + 1}-${toDate}`;

      return `${formattedFrom} ${formattedTo}`;
    }
  };

  const labels = [
    { name: "Date created", value: "date" },
    { name: "Status", value: "status" },
    { name: "Previous Balance", value: "previous balance" },
    { name: "Current Balance", value: "current balance" },
    { name: "Amount", value: "amount" },
    { name: "Customer", value: "customer" },
    { name: "Reference", value: "reference" },
    { name: "Type", value: "type" },
  ];

  return (
    <div className={styles.container}>
      {transactions.length > 0 && !loading ? (
        <div className={styles.transactions}>
          <h3 className={styles.transactionsHeading}>Transactions</h3>
          <div className={styles.filter}>
            <div className={styles.filterToggle}>
              <span>Filter</span>
              <img
                src={isOpen ? arrowDown : arrowUp}
                alt=""
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>
            <div className={styles.exportToExcel}>
              <ExportToExcel
                dataset={transactions}
                labels={labels}
                filename="Transactions Log"
              />
            </div>
            <div
              className={
                isOpen ? `${styles.filters} ${styles.isOpen}` : styles.filters
              }
            >
              {/* <label className={styles.inputGroup}>
                <input
                  className={styles.searchTransactions}
                  type="text"
                  placeholder="Search Transactions"
                />
                <span>Search Transactions</span>
              </label> */}
              <label className={styles.inputGroup}>
                <select
                  className={styles.filterTransactions}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by Transaction Type</option>
                  <option value="">All transactions</option>
                  <option value="1">Energy</option>
                  <option value="2">Cashout</option>
                  <option value="3">Deposit</option>
                  <option value="4">Airtime</option>
                  <option value="5">DSTV</option>
                  <option value="6">GOTV</option>
                  <option value="7">Transfer</option>
                  <option value="8">Data</option>
                </select>
              </label>
              <label className={styles.inputGroup}>
                From:{" "}
                <DatePicker
                  disableFuture
                  clearLabel
                  openTo="date"
                  format="dd/MM/yyyy"
                  views={["year", "month", "date"]}
                  value={selectedDateFrom}
                  onChange={handleSelectedDateFrom}
                />
              </label>
              <label className={styles.inputGroup}>
                To:{" "}
                <DatePicker
                  disableFuture
                  clearLabel
                  openTo="date"
                  format="dd/MM/yyyy"
                  views={["year", "month", "date"]}
                  value={selectedDateTo}
                  onChange={handleSelectedDateTo}
                />
              </label>
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeading}>
              <span className={styles.status}>Status</span>
              <span className={styles.date}>Date</span>
              <span className={styles.amount}>Amount</span>
              <span className={styles.type}>Type</span>
              <span className={styles.prev}>Previous</span>
              <span className={styles.current}>Balance</span>
              <span className={styles.customer}>Customer</span>
              <span className={styles.ref}>Reference</span>
              <span className={styles.action}>Actions</span>
            </div>
            <div className={styles.tableBody}>
              {transactions.map((transaction, index) => {
                const date = new Date(transaction.created_at).toString();
                const formattedDate = date.slice(4, 24);

                return (
                  <div className={styles.tableRow} key={index}>
                    <span className={styles.status}>
                      <span
                        className={`${styles.color} ${
                          transaction.status === "failed"
                            ? styles.failed
                            : transaction.status === "pending"
                            ? styles.pending
                            : styles.success
                        }`}
                      ></span>
                    </span>
                    <span className={styles.date}>{formattedDate}</span>
                    <span className={styles.amount}>{transaction.amount}</span>
                    <span className={styles.type}>
                      {transaction.transtype?.name}
                    </span>
                    <span className={styles.prev}>
                      {formatToCurrency(
                        transaction.wallet_history.previous_bal
                      )}
                    </span>
                    <span className={styles.current}>
                      {formatToCurrency(transaction.wallet_history.current_bal)}
                    </span>
                    <span className={styles.customer}>
                      {transaction.customer_info}
                    </span>
                    <span className={styles.ref}>{transaction.reference}</span>

                    {/* <span className={styles.query}>
                    <img src={refresh} alt="" />
                  </span> */}
                    <div className={styles.action}>
                      <label htmlFor={`menu${index}`}>
                        <img className={styles.menu} src={menu} alt="" />
                      </label>
                      <input
                        name={`menu${index}`}
                        id={`menu${index}`}
                        type="checkbox"
                      />

                      <div className={styles.actions}>
                        <Link
                          to={`/transaction-details/${transaction.reference}`}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : loading ? (
        <ThreeDots fill="#3E215B" />
      ) : (
        <div>No transactions to display</div>
      )}
      {pageChangeLoading && <ThreeDots fill="#3E215B" />}
      {!loading && transactions.length ? (
        <div className={styles.pagination}>
          <span
            onClick={() => {
              setPageChangeLoading(true);
              setCurrentPage(1);
            }}
            className={currentPage === 1 ? styles.active : styles.normal}
          >
            First Page
          </span>
          <span
            onClick={() => {
              if (currentPage < lastPage) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage === lastPage}
          >
            Next Page
          </span>
          <span className={`${styles.currentPage} ${styles.active}`} disabled>
            {currentPage}
          </span>
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
          <span
            onClick={() => {
              if (currentPage > firstPage) {
                setCurrentPage(currentPage - 1);
                setPageChangeLoading(true);
              }
            }}
          >
            Prev Page
          </span>
          <span
            onClick={() => {
              if (currentPage < lastPage) {
                setCurrentPage(lastPage);
                setPageChangeLoading(true);
              }
            }}
            className={currentPage === lastPage ? styles.active : styles.normal}
            disabled={currentPage === lastPage}
          >
            Last Page
          </span>
        </div>
      ) : undefined}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    setTransactionsLog: (payload) => dispatch(setTransactionLog(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    uuid: state.auth.user.uuid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionLog);
