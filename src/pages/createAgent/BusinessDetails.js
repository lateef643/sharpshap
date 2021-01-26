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
    if (states && states.length > 0 && agentData.state_id) {
      const selectedState = states.find((state) => {
        console.log(state);
        return state.id == agentData.state_id;
      });

      const generatedCode = Math.floor(10000000 + Math.random() * 90000000);

      dispatch({
        type: "SET_AGENT_DATA",
        payload: {
          agent_code: `CI/AGT/${selectedState.statecode}/${generatedCode}`,
        },
      });
    }
  }, [agentData.state_id]);

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
      agentData.business_name &&
      agentData.business_type &&
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
          <label className={styles.label} htmlFor="business_name">
            Business Name
          </label>
          <input
            className={styles.input}
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
          <label className={styles.label} htmlFor="business_address">
            Business Address
          </label>
          <input
            className={styles.input}
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
          <label className={styles.label} htmlFor="state_id">
            State
          </label>
          <select
            className={styles.select}
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
          <label className={styles.label} htmlFor="business_type">
            Business Type
          </label>
          <select
            className={styles.select}
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
          <label className={styles.label} htmlFor="agent_type">
            Agent Type
          </label>
          <select
            className={styles.select}
            name="agent_type"
            onChange={handleOnChange}
            value={agentData.agent_type}
          >
            <option value="">Select type</option>
            <option value="aggregator">Aggregator</option>
          </select>
          {errors && !agentData.agent_type && (
            <p className={styles.errorText}>Please Select Agent type</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="local_government_id">
            LGA
          </label>
          <select
            className={styles.select}
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
        <div className={`${styles.submit} ${styles.formGroup}`}>
          <button
            onClick={() => setStatus("personal")}
            className={`${styles.button} ${styles.back}`}
          >
            Back
          </button>
          <button className={`${styles.button}`}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDetails;
