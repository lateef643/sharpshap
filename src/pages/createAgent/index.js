import React, { useState, useReducer } from "react";
import Axios from "axios";

import agentDataReducer, { initialState } from "./agent-reducer";
import { CREATE_AGENT } from "../../utils/constants";

import PersonalDetails from "./PersonalDetails";
import BusinessDetails from "./BusinessDetails";
import FileUploads from "./FileUploads";
import AccountDetails from "./AccountDetails";

import NavHome from "../../components/layout/HomeNavBar";

import check from "../../assets/images/check.svg";
import cross from "../../assets/images/cross.svg";

import styles from "./index.module.scss";

const CreateAgent = () => {
  const [agentData, dispatch] = useReducer(agentDataReducer, initialState);

  const [status, setStatus] = useState("personal");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const createAgent = (agentData) => {
    setLoading(true);

    (async function create() {
      try {
        const res = await Axios.post(CREATE_AGENT);

        if (res) {
          setMessage("Agent Created Successfully");
          setLoading(false);
        }
      } catch (e) {
        setError("An Error occurred, please try again.");
        setLoading(false);
      }
    })();
  };

  return (
    <div className={styles.register}>
      <NavHome theme="dark" />
      <div className={styles.createAgent}>
        {message && (
          <div className={styles.success}>
            <img src={check} alt="" />
            <span>{message}</span>
          </div>
        )}
        {error && (
          <div className={styles.error}>
            <img src={cross} alt="" />
            <span>{error}</span>
          </div>
        )}
        <div className={styles.create}>
          <div className={styles.steps}>
            <span
              className={
                status === "personal"
                  ? `${styles.tab} ${styles.tabActive}`
                  : `${styles.tab}`
              }
            >
              Personal
            </span>
            <span
              className={
                status === "business"
                  ? `${styles.tab} ${styles.tabActive}`
                  : `${styles.tab}`
              }
            >
              Business
            </span>
            <span
              className={
                status === "account"
                  ? `${styles.tab} ${styles.tabActive}`
                  : `${styles.tab}`
              }
            >
              Account
            </span>
            <span
              className={
                status === "file"
                  ? `${styles.tab} ${styles.tabActive}`
                  : `${styles.tab}`
              }
            >
              Files
            </span>
          </div>
          <div className={styles.content}>
            {
              {
                personal: (
                  <PersonalDetails
                    agentData={agentData}
                    dispatch={dispatch}
                    setStatus={setStatus}
                  />
                ),
                business: (
                  <BusinessDetails
                    agentData={agentData}
                    dispatch={dispatch}
                    setStatus={setStatus}
                  />
                ),
                account: (
                  <AccountDetails
                    agentData={agentData}
                    dispatch={dispatch}
                    setStatus={setStatus}
                    createAgent={createAgent}
                    loading={loading}
                  />
                ),
                file: <FileUploads />,
              }[status]
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;
