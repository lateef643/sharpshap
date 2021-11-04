import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { Link } from "react-router-dom";
import minus from "../../../assets/images/minus.svg";
import plus from "../../../assets/images/plus.svg";
import { connect } from "react-redux";
import { setCurrentPage } from "../../../actions/page";
import formatToCurrency from "../../../utils/formatToCurrency";
import { GET_AGENT_WALLET_HISTORY } from "../../../utils/constants";
import styles from "./WalletLog.module.scss";
import arrowDown from "../../../assets/icons/arrowdown.svg";
import arrowUp from "../../../assets/images/arrowUp.svg";
import menu from "../../../assets/images/dots.svg";

export const WalletLog = ({ changeCurrentPage }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [total, setTotal] = useState(null);
  // const [perPage, setPerPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [lastPage, setLastPage] = useState("");
  const [pageChangeLoading, setPageChangeLoading] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [accordionToggle, setAccordionToggle] = useState(false);
  const [activeListItem, setActiveListItem] = useState(null);
  const firstPage = 1;
  const [isOpen, setIsOpen] = useState(false);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    let isCancelled = false;

    setPageChangeLoading(true);

    const params = {};

    if (transactionTypeFilter) params.type = transactionTypeFilter;

    axios
      .get(`${GET_AGENT_WALLET_HISTORY}?page=${currentPage}`, { params })
      .then((res) => {
        const transactions = res.data.data.data;
        const total = res.data.data.total;
        const perPage = res.data.data.per_page;

        // const prevPage = res.data.data.prev_page_url;
        // const nextPageUrl = res.data.data.next_page_url;
        const lastPage = res.data.data.last_page;
        // const currentPage = res.data.data.current_page;
        let pageNumbers = [];

        if (total !== null && total > 0) {
          for (let i = 1; i <= Math.ceil(total / perPage); i++) {
            pageNumbers.push(i);
          }
          setPageNumbers(pageNumbers);
        }

        if (!isCancelled) {
          setLastPage(lastPage);
          // setTotal(total);
          // setPerPage(perPage);
          setTransactions(transactions);
          setLoading(false);
          setPageChangeLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setTransactions([]);
          setLoading(false);
          setPageChangeLoading(false);
        }
      });

    return () => {
      isCancelled = false;
    };
  }, [currentPage]);

  useEffect(() => {
    changeCurrentPage({
      heading: "Wallet Log",
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

  return (
    <div className={styles.container}>
      {transactions.length > 0 && !loading ? (
        <div className={styles.transactions}>
          <h3 className={styles.transactionsHeading}>Logs</h3>
          {/* <div className={styles.filter}>
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
            <div
              className={
                isOpen ? `${styles.filters} ${styles.isOpen}` : styles.filters
              }
            >
              <label className={styles.inputGroup}>
                <input
                  className={styles.searchTransactions}
                  type="text"
                  placeholder="Search Transactions"
                />
                <span>Search Transactions</span>
              </label>
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
                <select className={styles.filterTransactions}>
                  <option value="">Date Added</option>
                </select>
              </label>
            </div>
          </div> */}
          <div className={styles.table}>
            <div className={styles.tableHeading}>
              <span className={styles.sn}>S/N</span>
              <span className={styles.date}>Date</span>
              <span className={styles.amount}>Amount</span>
              <span className={styles.prev}>Previous</span>
              <span className={styles.current}>Balance</span>
              <span className={styles.description}>Description</span>
              <span className={styles.type}>Type</span>
              <span className={styles.mode}>Mode</span>
            </div>
            <div className={styles.tableBody}>
              {transactions.map((transaction, index) => {
                const date = new Date(transaction.created_at).toString();
                const formattedDate = date.slice(4, 24);

                return (
                  <div className={styles.tableRow} key={index}>
                    <span className={styles.sn}>{++index}.</span>
                    <span className={styles.date}>{formattedDate}</span>
                    <span className={styles.amount}>{transaction.amount}</span>

                    <span className={styles.prev}>
                      {formatToCurrency(transaction.previous_bal)}
                    </span>
                    <span className={styles.current}>
                      {formatToCurrency(transaction.current_bal)}
                    </span>
                    <span className={styles.description}>
                      {transaction.description}
                    </span>
                    <span className={styles.type}>{transaction.type}</span>
                    <span className={styles.mode}>{transaction.mode}</span>

                    {/* <span className={styles.query}>
                    <img src={refresh} alt="" />
                  </span> */}
                    {/* <div className={styles.action}>
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
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : loading || pageChangeLoading ? (
        <ThreeDots fill="#3E215B" />
      ) : (
        <div>No transactions to display</div>
      )}
      {!loading && pageChangeLoading && <ThreeDots fill="#3E215B" />}
      {!loading && transactions.length > 0 && (
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
          <span className={styles.active} disabled>
            {currentPage}
          </span>
          {/* {
          pageNumbers.map((page, index) => {
            return <span key={`${index}--key`}onClick={() => {
              setCurrentPage(page);
              setPageChangeLoading(true);
            }} 
            className={currentPage === page ? styles.active : styles.normal}>{page}</span>
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
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(WalletLog);
