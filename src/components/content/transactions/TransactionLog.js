import React, { useEffect, useState } from "react";
import axios from "axios";
import ListLoader from "../../partials/ListLoader";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import formatToCurrency from "../../../util/formatToCurrency";
import ExportToExcel from "../../shared/ExportToExcel";
import styles from "./TransactionLog.module.scss";
import { setCurrentPage } from "../../../actions/page";
import { setTransactionLog } from "../../../actions/transaction";
import { AGENT_TRANSACTION_HISTORY } from "../../../store/api/constants";

export const TransactionLog = ({
  changeCurrentPage,
  setTransactionsLog,
  uuid,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [walletInfo, setWalletInfo] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [lastPage, setLastPage] = useState("");
  const [pageChangeLoading, setPageChangeLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("");
  const [accordionToggle, setAccordionToggle] = useState(false);
  const firstPage = 1;

  useEffect(() => {
    const now = new Date();
    const nowString = now.toString();
  }, []);

  useEffect(() => {
    setPageChangeLoading(true);

    const params = {};

    if (transactionTypeFilter) params.type = transactionTypeFilter;
    if (from) params.from = from;
    if (to) params.to = to;
    if (currentPage) params.page = currentPage;

    (async function getTransactionsLog() {
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
        setLoading(false);
        setLastPage(lastPage);
        // setBusinessName(businessName);
        setTransactions(transactions);
        setPageChangeLoading(false);
      }
    })();
  }, [transactionTypeFilter, currentPage, date]);

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

  const setDateFiltes = (date) => {
    let from = date[0];
    let to = date[1];

    const fromMonth = from.getMonth();
    const toMonth = to.getMonth();
    const fromDate = from.getDate();
    const toDate = to.getDate();
    const fromYear = from.getFullYear();
    const toYear = to.getFullYear();

    const formattedFrom = `${fromYear}-${fromMonth + 1}-${fromDate}`;
    const formattedTo = `${toYear}-${toMonth + 1}-${toDate}`;

    setFrom(formattedFrom);
    setTo(formattedTo);
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
      {!loading && transactions.length > 0 ? (
        <div className={styles.filters}>
          <div className={styles.filtersContainer}>
            <div className={styles.export}>
              <ExportToExcel
                dataset={transactions}
                labels={labels}
                filename="Transactions Log"
              />
            </div>
            <div className={styles.dateFilterContainer}>
              <div className={styles.dateFilter}>
                <DateRangePicker
                  onChange={(date) => {
                    setDate(date);
                    setDateFiltes(date);
                  }}
                  value={date}
                />
              </div>
            </div>
            <div>
              <select
                className={styles.filterDropDown}
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
            </div>
          </div>
        </div>
      ) : undefined}
      {loading || pageChangeLoading ? (
        <div className={styles.loaderContainer}>
          <ListLoader />
        </div>
      ) : undefined}
      {!loading && transactions.length > 0 ? (
        <div className={styles.heading}>
          <span className={styles.status}>Status</span>
          <span className={styles.date}>Date Created</span>
          <span className={styles.amount}>Amount</span>
          <span className={styles.type}>Type</span>
          <span className={styles.prev}>Prev Balance</span>
          <span className={styles.current}>Current Balance</span>
          <span className={styles.customer}>Customer</span>
          <span className={styles.ref}>Reference</span>
          {/* <span className={styles.itemSix}>Agent</span> */}
          <span className={styles.details}>Details</span>
        </div>
      ) : undefined}
      {!loading || !pageChangeLoading
        ? transactions.map((transaction, index) => (
            <div key={transaction.id} className={styles.log}>
              <div className={`${styles.logItem} ${styles.status}`}>
                {/* <span className={`${styles.headingMobile} ${styles.statusHeadingMobile}`}>Status:</span> */}
                <span className={styles.statusColor}>
                  <span
                    className={`${
                      transaction.status === "failed"
                        ? styles.failed
                        : transaction.status === "pending"
                        ? styles.pending
                        : styles.success
                    }`}
                  ></span>
                </span>
                <span className={styles.statusDate}>
                  {transaction.created_at}
                </span>
                <span className={styles.statusAmount}>
                  {formatToCurrency(transaction.amount)}
                </span>
                <span className={styles.statusType}>
                  {transaction.transtype.name}
                </span>
                <span className={styles.statusPrev}>
                  {formatToCurrency(transaction.wallet_history.previous_bal)}
                </span>
                <span className={styles.statusCurrent}>
                  {formatToCurrency(transaction.wallet_history.current_bal)}
                </span>
                <span className={styles.statusCustomer}>
                  {transaction.customer_info}
                </span>
                <span className={styles.statusRef}>
                  {transaction.reference}
                </span>
                <Link to={`/transaction-details/${transaction.reference}`}>
                  View Details
                </Link>
                <span
                  className={styles.statusAccordionToggle}
                  onClick={(e) => {
                    setAccordionToggle(
                      accordionToggle === index + 1 ? false : index + 1
                    );
                  }}
                >
                  {accordionToggle === index + 1 ? (
                    <span>-</span>
                  ) : (
                    <span>+</span>
                  )}
                </span>
              </div>
              {accordionToggle === index + 1 ? (
                <>
                  <div className={`${styles.logItem} ${styles.date}`}>
                    <span
                      className={`${styles.headingMobile} ${styles.dateHeadingMobile}`}
                    >
                      Date:
                    </span>
                    <span>{transaction.created_at}</span>
                  </div>
                  <div className={`${styles.logItem} ${styles.prev}`}>
                    <span
                      className={`${styles.headingMobile} ${styles.prevHeadingMobile}`}
                    >
                      Previous Balance:
                    </span>
                    <span className={styles.prevContent}>
                      {transaction.wallet_history.previous_bal}
                    </span>
                  </div>
                  <div className={`${styles.logItem} ${styles.current}`}>
                    <span
                      className={`${styles.headingMobile} ${styles.currentHeadingMobile}`}
                    >
                      Current Balance:
                    </span>
                    <span className={styles.currentContent}>
                      {transaction.wallet_history.current_bal}
                    </span>
                  </div>
                  <div className={`${styles.logItem} ${styles.amount}`}>
                    <span
                      className={`${styles.headingMobile} ${styles.amountHeadingMobile}`}
                    >
                      Amount:
                    </span>
                    <span className={styles.amountContent}>
                      {formatToCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className={`${styles.logItem} ${styles.customer}`}>
                    <span
                      className={`${styles.headingMobile} ${styles.customerHeadingMobile}`}
                    >
                      Customer:
                    </span>
                    <span className={styles.customerContent}>
                      {transaction.customer_info}
                    </span>
                  </div>
                  <div className={`${styles.logItem} ${styles.ref}`}>
                    <span
                      className={`${styles.headingMobile} ${styles.refHeadingMobile}`}
                    >
                      Ref:
                    </span>
                    <span className={styles.dateContent}>
                      {transaction.reference}
                    </span>
                  </div>
                  <div className={`${styles.logItem} ${styles.type}`}>
                    <span
                      className={`${styles.headingMobile} ${styles.typeHeadingMobile}`}
                    >
                      Type:
                    </span>
                    <span className={styles.typeContent}>
                      {transaction.transtype.name}
                    </span>
                  </div>
                  {/* <span className={styles.itemSix}>{transaction.agent.business_name}</span> */}
                  <div className={`${styles.logItem} ${styles.details}`}>
                    <span
                      className={`${styles.headingMobile} ${styles.detailsHeadingMobile}`}
                    >
                      Details:
                    </span>
                    <Link to={`/transaction-details/${transaction.reference}`}>
                      View Details
                    </Link>
                  </div>
                </>
              ) : undefined}
            </div>
          ))
        : undefined}
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
    uuid: state.auth.user.agent.uuid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionLog);
