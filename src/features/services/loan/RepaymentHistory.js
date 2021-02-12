import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { connect } from "react-redux";

import { REPAYMENT_HISTORY } from "../../../utils/constants";

import styles from "./RepaymentHistory.module.scss";

export const RechargeCableForm = ({ agentId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCancelled;

    (async function getLoanHistory() {
      setLoading(true);
      try {
        const res = await axios.post(REPAYMENT_HISTORY, agentId);
        const history = res.data.data;

        console.log(history);

        if (res && !isCancelled) setHistory(history);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      {history.length > 0 && !loading ? (
        <div className={styles.transactions}>
          <h3 className={styles.transactionsHeading}>Users</h3>
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
                    className={styles.searchUsers}
                    type="text"
                    placeholder="Search Users"
                  />
                  <span>Search Users</span>
                </label>
                <label className={styles.inputGroup}>
                  <select className={styles.filterUsers}>
                    <option value="">Type</option>
                  </select>
                </label>
                <label className={styles.inputGroup}>
                  <select className={styles.filterUsers}>
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
              <span className={styles.duration}>Duration</span>
              <span className={styles.status}>Status</span>
              <span className={styles.disbursed}>Disbursed</span>
              <span className={styles.due}>Due date</span>
              {/* <span className={styles.query}>Query</span> */}
            </div>
            <div className={styles.tableBody}>
              {history.map((history, index) => {
                const date = new Date(history.created_at).toDateString();
                const formattedDate = date.slice(4);

                return (
                  <div className={styles.tableRow} key={index}>
                    <span className={styles.sn}>{++index}.</span>
                    <span className={styles.date}>{formattedDate}</span>
                    <span className={styles.amount}>
                      {history.amount || "Nil"}
                    </span>
                    <span className={styles.duration}>{history.duration}</span>
                    <span className={styles.status}>{history.status}</span>
                    <span className={styles.disbursed}>
                      {history.disbursed}
                    </span>
                    <span className={styles.due}>{history.due_date}</span>

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
                        <span
                          className={`${styles.actionsItem} ${styles.actionsItemEdit}`}
                        >
                          Edit User
                        </span>
                        <span
                          className={styles.actionsItem}
                          onClick={() => {
                            handleDeleteUser(user.id);
                          }}
                        >
                          Deactivate User
                        </span>
                      </div>
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : loading ? (
        <ThreeDots fill="#3E215B" />
      ) : (
        <div style={{ fontSize: "16px" }}>Nothing to display</div>
      )}
    </div>
  );
};

RechargeCableForm.propTypes = {
  RechargeCableFormState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    agentId: state.auth.user.id,
  };
};

export default connect(mapStateToProps)(RechargeCableForm);
