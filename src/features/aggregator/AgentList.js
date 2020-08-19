import React, { useEffect, useState } from "react";
import Axios from "axios";

import { GET_SUB_AGENTS } from "../../store/api/constants";

import styles from "./AgentLIst.module.scss";

const AgentList = () => {
  const [agentListData, setAgentListData] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    (async function getCommissionHistory() {
      try {
        const res = await Axios.get(GET_SUB_AGENTS);

        const agentListData = res.data.data;

        if (!isCancelled) {
          setAgentListData(agentListData);
        }
      } catch (e) {
        console.log(e.response);
      }
    })();
  }, []);

  return (
    <div className={styles.agentList}>
      {agentListData && agentListData.length > 0 ? (
        <>
          <div className={styles.filter}>
            <input
              className={styles.search}
              type="text"
              placeholder="Search Agents"
            />
            <select className={styles.sortby}>
              <option value="">Date</option>
            </select>
          </div>
          <div className={styles.list}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr className={styles.tableRow}>
                  <th>Status</th>
                  <th>Agent ID</th>
                  <th>Business Name</th>
                  <th>Phone Number</th>
                  <th>Terminal ID</th>
                  <th>Serial Number</th>
                  <th>Date Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                  <td>
                    <span className={styles.status}></span>
                  </td>
                  <td>CI/AGT/LA/81840640</td>
                  <td>Tola Enterprises</td>
                  <td>08064829451</td>
                  <td>CICO2345678</td>
                  <td>35648983989099</td>
                  <td>2020-06-27 19:23:35</td>
                  <td>Something</td>
                </tr>
                <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                  <td>
                    <span className={styles.status}></span>
                  </td>
                  <td>CI/AGT/LA/81840640</td>
                  <td>Tola Enterprises</td>
                  <td>08064829451</td>
                  <td>CICO2345678</td>
                  <td>35648983989099</td>
                  <td>2020-06-27 19:23:35</td>
                  <td>Something</td>
                </tr>
                <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                  <td>
                    <span className={styles.status}></span>
                  </td>
                  <td>CI/AGT/LA/81840640</td>
                  <td>Tola Enterprises</td>
                  <td>08064829451</td>
                  <td>CICO2345678</td>
                  <td>35648983989099</td>
                  <td>2020-06-27 19:23:35</td>
                  <td>Something</td>
                </tr>
                <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                  <td>
                    <span className={styles.status}></span>
                  </td>
                  <td>CI/AGT/LA/81840640</td>
                  <td>Tola Enterprises</td>
                  <td>08064829451</td>
                  <td>CICO2345678</td>
                  <td>35648983989099</td>
                  <td>2020-06-27 19:23:35</td>
                  <td>Something</td>
                </tr>
                <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                  <td>
                    <span className={styles.status}></span>
                  </td>
                  <td>CI/AGT/LA/81840640</td>
                  <td>Tola Enterprises</td>
                  <td>08064829451</td>
                  <td>CICO2345678</td>
                  <td>35648983989099</td>
                  <td>2020-06-27 19:23:35</td>
                  <td>Something</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No Agents Found.</p>
      )}
    </div>
  );
};

export default AgentList;
