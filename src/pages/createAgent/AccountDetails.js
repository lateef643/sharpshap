import React, { useReducer, useState, useEffect } from "react";

import agentDataReducer, { initialState } from "./agent-reducer";
import { ThreeDots } from "svg-loaders-react";

import { FETCH_BANKS, FETCH_STATES, FETCH_LGAS } from "../../utils/constants";

import styles from "./form.module.scss";
import Axios from "axios";

const AccountDetails = ({
  setStatus,
  agentData,
  dispatch,
  loading,
  createAgent,
}) => {
  const [errors, setErrors] = useState(false);
  const [banks, setBanks] = useState(null);
  const [states, setStates] = useState(null);
  const [LGA, setLGA] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchBanks = Axios.get(FETCH_BANKS);
    const fetchStates = Axios.get(FETCH_STATES);

    Axios.all([fetchBanks, fetchStates])
      .then(
        Axios.spread((...responses) => {
          const banksResponse = responses[0];
          const statesResponse = responses[1];

          if (!isCancelled) {
            setBanks(banksResponse.data.data);
            setStates(statesResponse.data.data);
          }
        })
      )
      .catch((e) => {
        // console.log(e)
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    if (agentData.state_id) {
      (async function fetchLGA() {
        try {
          const res = await Axios.get(`${FETCH_LGAS}/${agentData.state_id}`);

          if (!isCancelled) {
            setLGA(res.data.data);
          }
        } catch (e) {
          // console.log(e)
        }
      })();
    }

    return () => {
      isCancelled = true;
    };
  }, [agentData.state_id]);

  const handleOnChange = ({ target }) => {
    setErrors(false);

    dispatch({
      type: "SET_AGENT_DATA",
      payload: { [target.name]: target.value },
    });
  };

  const handleProceed = (e) => {
    e.preventDefault();

    const hasNoErrors =
      agentData.bank_id &&
      agentData.account_name &&
      agentData.account_number &&
      agentData.identity_type;

    if (hasNoErrors) {
      // console.log(agentData);
      // setStatus("file");

      createAgent(agentData);
    } else {
      setErrors(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleProceed}>
        <div className={styles.formGroup}>
          <label htmlFor="account_name">Account Name</label>
          <input
            type="text"
            name="account_name"
            onChange={handleOnChange}
            value={agentData.account_name}
          />
          {errors && !agentData.account_name && (
            <p className={styles.errorText}>Please Enter Account Name</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="account_number">Account Number</label>
          <input
            type="text"
            name="account_number"
            onChange={handleOnChange}
            value={agentData.account_number}
          />
          {errors && !agentData.account_number && (
            <p className={styles.errorText}>Please Enter Account No.</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="identity_type">ID Type</label>
          <select
            type="text"
            name="identity_type"
            onChange={handleOnChange}
            value={agentData.identity_type}
          >
            <option value="">Select type</option>
            <option value="Driver's License">Driver's License</option>
            <option value="Voter's Card">Voter's Card</option>
            <option value="National Identity Card">
              National Identity Card
            </option>
            <option value="passport">Passport</option>
          </select>
          {errors && !agentData.mobile && (
            <p className={styles.errorText}>Please Select ID type</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bank_id">Bank Name</label>
          <select
            type="text"
            name="bank_id"
            onChange={handleOnChange}
            value={agentData.bank_id}
          >
            <option value="">Select Bank</option>
            {banks?.map((bank, index) => {
              return (
                <option value={bank.code} key={`${index}--${bank.name}`}>
                  {bank.name}
                </option>
              );
            })}
          </select>
          {errors && !agentData.bank_id && (
            <p className={styles.errorText}>Please Select Bank</p>
          )}
        </div>
        <div className={`${styles.submit} ${styles.formGroup}`}>
          <button onClick={() => setStatus("personal")} className={styles.back}>
            Back
          </button>
          <button type="submit">{loading ? <ThreeDots /> : "Register"}</button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
