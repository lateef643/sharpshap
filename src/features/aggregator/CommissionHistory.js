import React, { useEffect, useState } from "react";
import Axios from "axios";

import { GET_COMMISSION_HISTORY } from "../../store/api/constants";

import styles from "./CommissionHistory.module.scss";

const CommissionHistory = () => {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    (async function getCommissionHistory() {
      try {
        const res = await Axios.get(GET_COMMISSION_HISTORY);

        const history = res.data.data;

        if (!isCancelled) {
          setHistory(history);
        }
      } catch (e) {
        console.log(e.response);
      }
    })();
  }, []);

  return (
    <div className={styles.commissionHistory}>
      {history && history.length > 0 ? (
        <>
          <div className={styles.filter}>
            <select className={styles.sortby}>
              <option value="date">Date</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className={styles.list}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr className={styles.tableRow}>
                  <th>Serial Number</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {history.map((history, index) => {
                  return (
                    <tr
                      key={index}
                      className={`${styles.tableBodyRow} ${styles.tableRow}`}
                    >
                      <td>{index + 1}</td>
                      <td>{history.amount}</td>
                      <td>{history.description}</td>
                      <td>{history.mode}</td>
                      <td>{history.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No commissions found.</p>
      )}
    </div>
  );
};

export default CommissionHistory;
