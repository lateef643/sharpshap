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
  const [total, setTotal] = useState(null);
  const [perPage, setPerPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [lastPage, setLastPage] = useState("");

  useEffect(() => {
    axios.get(`${ALL_WALLET_LOGS}?page=${currentPage}`)
    .then((res) => {
      const logs = res.data.data.data;
      const total = res.data.data.total;
      const perPage = res.data.data.per_page;
      const prevPage = res.data.data.prev_page_url;
      const nextPageUrl = res.data.data.next_page_url;
      const lastPage = res.data.data.last_page;
      const currentPage = res.data.data.current_page;
      let pageNumbers = [];

      if (total !== null && total > 0) {
        for (let i = 1; i <= Math.ceil(total / perPage); i++) {
          pageNumbers.push(i);
        };
        setPageNumbers(pageNumbers);
      }

      setLastPage(lastPage);
      setTotal(total);
      setPerPage(perPage);
      setLogs(logs);
      setLoading(false);

    })
    .catch((err) => {
      console.log(err);
    })    
  }, [currentPage]);

  useEffect(() => {
    changeCurrentPage({
      heading: "Wallet Log",
      search: true
    });    
  }, [changeCurrentPage]);

  const handlePageChange = () => {

  };

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

      {!loading ? 
        <div className={style.pagination}>
          <span onClick={() => {
              setCurrentPage(1);
            }} 
            className={currentPage === 1 ? style.active : style.normal}>First Page</span>
          <span onClick={() => {
              currentPage < lastPage ? setCurrentPage(currentPage++) : setCurrentPage();
            }} 
          disabled={currentPage === lastPage}>Next Page</span>
         {
          pageNumbers.map((page) => {
            return <span onClick={() => {
              setCurrentPage(page)
            }} 
            className={currentPage === page ? style.active : style.normal}>{page}</span>
          })
        } 
          <span onClick={() => {
            currentPage < lastPage ? setCurrentPage(lastPage) : setCurrentPage();
         }} 
          className={currentPage === lastPage ? style.active : style.normal}
          disabled={!total}>Last Page</span>
        </div> : undefined}
  </div>
)}

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(WalletLog);