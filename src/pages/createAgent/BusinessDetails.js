import React, { useState, useEffect } from "react";

import validateFormData from "../../validation/validateFormData";

import { FETCH_STATES, FETCH_LGAS } from "../../utils/constants";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./BusinessDetails.module.scss";
import Axios from "axios";

const BusinessDetails = ({ setStatus, agentData, dispatch }) => {
  const [validationErrors, setValidationErrors] = useState({ errors: true });
  const [states, setStates] = useState([]);
  const [LGA, setLGA] = useState([]);



  useEffect(() => {
    if (states && states.length > 0 && agentData.state_id) {
      const selectedState = states.find((state) => {
        return state.id == agentData.state_id;
      });

      const generatedCode = Math.floor(10000000 + Math.random() * 90000000);

      dispatch({
        type: "SET_AGENT_DATA",
        payload: {
          agent_code: `EGL/AGT/${selectedState.statecode}/${generatedCode}`,
        },
      });
    }
  }, [agentData.state_id]);

  useEffect(() => {
    let isCancelled = false;

    Axios.get(FETCH_STATES)
      .then((res) => {
        const states = res.data.data;

        if (!isCancelled) setStates(states);
      })
      .catch((e) => console.log(e));

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
    setValidationErrors({ ...validationErrors, [target.name]: "" });

    dispatch({
      type: "SET_AGENT_DATA",
      payload: { [target.name]: target.value },
    });
  };

  const handleProceed = (e) => {
    e.preventDefault();

    const {
      business_name,
      business_address,
      state_id,
      business_type,
      agent_type,
      local_government_id,
    } = agentData;

    const state = {
      business_name,
      business_address,
      state_id,
      business_type,
      agent_type,
      local_government_id,
    };

    const keys = Object.keys(state);
    const errors = validateFormData(agentData, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setStatus("account");
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
          {validationErrors.business_name && (
            <p className={styles.errorText}>
              {validationErrors.business_name.text}
            </p>
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
          {validationErrors.business_address && (
            <p className={styles.errorText}>
              {validationErrors.business_address.text}
            </p>
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
          {validationErrors.state_id && (
            <p className={styles.errorText}>{validationErrors.state_id.text}</p>
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
          {validationErrors.business_type && (
            <p className={styles.errorText}>
              {validationErrors.business_type.text}
            </p>
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
          {validationErrors.local_government_id && (
            <p className={styles.errorText}>
              {validationErrors.local_government_id.text}
            </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="Referral_code">
            ReferralCode
          </label>
          <input
            className={styles.input}
            type="text"
            name="Referral_name"
            onChange={handleOnChange}
            value={agentData.business_name}
          />
          {/* {validationErrors.business_name && (
                        <p className={styles.errorText}>
                            {validationErrors.business_name.text}
                        </p>
                    )} */}
        </div>

        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="defaultUnchecked"
          />
          <label class="custom-control-label" for="defaultUnchecked"> &nbsp;
            I accept the terms and conditions
          </label>
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
