import React, { useEffect, useState } from "react";
// import axios from "axios";
import ListLoader from "../../../components/util/ListLoader";
import { connect } from "react-redux";
import style from "./ActivityLog.module.scss";
import { setCurrentPage } from "../../../actions/page";

export const ActivityLog = ({ changeCurrentPage }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get()
  //   .then((res) => {
  //     const logs = res.data.data.data;
  //     setLogs(logs);
  //     setLoading(false);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }, [])

  useEffect(() => {
    changeCurrentPage({
      heading: "Activity Log",
      search: false,
    });
  }, [changeCurrentPage]);

  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.loaderContainer}>
          <ListLoader />
        </div>
      ) : undefined}
      {!loading && transactions.length > 0 ? (
        <div className={style.heading}>
          <span>Status</span>
          <span>Amount</span>
          <span>Reference</span>
          <span>Type</span>
          <span>Customer</span>
          <span className={style.marginLeft}>Agent</span>
          <span>Vendor</span>
          <span>Terminal</span>
        </div>
      ) : undefined}
      {!loading
        ? transactions.map((transaction, index) => (
            <div key={index} className={style.card}>
              <span className={style.status}>
                <span
                  className={`${
                    transaction.status === "failed"
                      ? style.failed
                      : transaction.status === "pending"
                      ? style.pending
                      : style.success
                  }`}
                ></span>
              </span>
              <span>&#8358;{transaction.amount}</span>
              <span>{transaction.reference}</span>
              <span>{transaction.type}</span>
              <span>{transaction.customer}</span>
              <span className={style.marginLeft}>{transaction.agent}</span>
              <span>{transaction.vendor}</span>
              <span>{transaction.terminal}</span>
            </div>
          ))
        : undefined}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};
export default connect(undefined, mapDispatchToProps)(ActivityLog);
