import React, { useState, useReducer } from "react";

import agentDataReducer, { initialState } from "./agent-reducer";

import PersonalDetails from "./PersonalDetails";
import BusinessDetails from "./BusinessDetails";
import FileUploads from "./FileUploads";

import { CREATE_AGENT } from "../../../store/api/constants";

import check from "../../../assets/images/check.svg";
import cross from "../../../assets/images/cross.svg";

import styles from "./index.module.scss";
import Axios from "axios";

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
          {`Step ${
            status === "personal" ? 1 : status == "business" ? 2 : 3
          } of 3 - ${
            status === "personal"
              ? "Personal Details"
              : status == "business"
              ? "Business Details"
              : "File Uploads"
          }`}
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
                  createAgent={createAgent}
                  loading={loading}
                  setStatus={setStatus}
                />
              ),
              file: <FileUploads />,
            }[status]
          }
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;
