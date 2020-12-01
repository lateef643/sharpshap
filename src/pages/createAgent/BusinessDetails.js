import React, { useReducer, useState, useEffect } from "react";

import agentDataReducer, { initialState } from "./agent-reducer";
import { ThreeDots } from "svg-loaders-react";

import { FETCH_BANKS, FETCH_STATES, FETCH_LGAS } from "../../utils/constants";

import styles from "./BusinessDetails.module.scss";
import Axios from "axios";

const BusinessDetails = ({ setStatus, agentData, dispatch }) => {
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

          console.log(banksResponse);
          console.log(statesResponse);

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
      agentData.business_name &&
      agentData.business_type &&
      agentData.user_name &&
      agentData.agent_type &&
      agentData.state_id &&
      agentData.local_government_id &&
      agentData.business_address;

    if (hasNoErrors) {
      setStatus("account");
    } else {
      setErrors(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleProceed}>
        <div className={styles.formGroup}>
          <label htmlFor="business_name">Business Name</label>
          <input
            type="text"
            name="business_name"
            onChange={handleOnChange}
            value={agentData.business_name}
          />
          {errors && !agentData.business_name && (
            <p className={styles.errorText}>Please Enter Business Name</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="business_address">Business Address</label>
          <input
            type="text"
            name="business_address"
            onChange={handleOnChange}
            value={agentData.business_address}
          />
          {errors && !agentData.business_address && (
            <p className={styles.errorText}>Please Enter Business Address</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="state_id">State</label>
          <select
            type="text"
            name="state_id"
            onChange={handleOnChange}
            value={agentData.state_id}
          >
            <option value="">Select State</option>
            {states?.map((state, index) => {
              return (
                <option value={state.id} key={`${state.id}`}>
                  {state.name}
                </option>
              );
            })}
          </select>
          {errors && !agentData.state_id && (
            <p className={styles.errorText}>Please Select State</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="business_type">Business Type</label>
          <select
            name="business_type"
            onChange={handleOnChange}
            value={agentData.business_type}
          >
            <option value="">Select Business Type</option>
            <option value="payments">Payments</option>
          </select>
          {errors && !agentData.business_type && (
            <p className={styles.errorText}>Please Select LGA</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="agent_type">Agent Type</label>
          <select
            type="text"
            name="agent_type"
            onChange={handleOnChange}
            value={agentData.agent_type}
          >
            <option value="">Select type</option>
          </select>
          {errors && !agentData.agent_type && (
            <p className={styles.errorText}>Please Select Agent type</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="local_government_id">LGA</label>
          <select
            type="text"
            name="local_government_id"
            onChange={handleOnChange}
            value={agentData.local_government_id}
          >
            <option value="">Select LGA</option>
            {LGA?.map((lga, index) => {
              return (
                <option value={lga.id} key={`${lga.id}`}>
                  {lga.name}
                </option>
              );
            })}
          </select>
          {errors && !agentData.local_government_id && (
            <p className={styles.errorText}>Please Select LGA</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="user_name">User Name</label>
          <input
            type="text"
            name="user_name"
            onChange={handleOnChange}
            value={agentData.user_name}
          />
          {errors && !agentData.user_name && (
            <p className={styles.errorText}>Please Enter User Name</p>
          )}
        </div>
        <div className={`${styles.submit} ${styles.formGroup}`}>
          <button onClick={() => setStatus("personal")} className={styles.back}>
            Back
          </button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDetails;
