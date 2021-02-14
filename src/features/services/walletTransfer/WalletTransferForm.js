import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import wallet from "../../../assets/images/wallet-svgrepo-com.svg";
import styles from "./WalletTransferForm.module.scss";
import { VALIDATE_AGENT } from "../../../utils/constants";

export const WalletTransferForm = (props) => {
  const { dispatch, state, setStatus } = props;
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    let isCancelled = false;

    if (state.wallet_id.length > 9) {
      setVerificationLoading(true);
      (async function validateAgent() {
        const { wallet_id } = state;

        const req = {
          wallet_id,
        };

        try {
          const res = await axios.post(VALIDATE_AGENT, req);

          const agent_name = res.data.data.business_name;

          setVerificationLoading(false);

          if (!isCancelled) {
            dispatch({
              type: "UPDATE_STATE",
              payload: { agent_name },
            });
          }
        } catch (e) {
          if (!isCancelled) {
            dispatch({
              type: "UPDATE_STATE",
              payload: { agent_name: "" },
            });
          }
          setError(true);
          setVerificationLoading(false);
        }
      })();
    }

    return () => {
      isCancelled = true;
    };
  }, [state.wallet_id]);

  const handleOnProceed = (e) => {
    e.preventDefault();
    setStatus("summary");
  };

  const handleOnChange = ({ target }) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { [target.name]: target.value },
    });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleOnProceed}>
        {/* <div className={styles.imageContainer}>
          <img src={wallet} className={styles.image} alt="" />
        </div> */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="wallet_id">
            Wallet ID
          </label>
          <input
            placeholder="Beneficiary's wallet ID"
            className={
              validationErrors.amount
                ? `${styles.outlineRed} ${styles.input}`
                : `${styles.outlineGrey} ${styles.input}`
            }
            name="wallet_id"
            type="text"
            value={state.wallet_id}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="agent_name">
            Agent Name
          </label>
          <input
            className={
              validationErrors.agent_name
                ? `${styles.outlineRed} ${styles.input}`
                : `${styles.outlineGrey} ${styles.input}`
            }
            name="agent_name"
            type="text"
            readOnly={true}
            value={state.agent_name}
            onChange={handleOnChange}
          />
          {verificationLoading && (
            <span className={styles.loader}>
              <ThreeDots />
            </span>
          )}
          {error && (
            <p className={styles.validationErrorText}>
              Account validation failed, please try again.
            </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="amount">
            Amount
          </label>
          <input
            className={
              validationErrors.amount
                ? `${styles.outlineRed} ${styles.input}`
                : `${styles.outlineGrey} ${styles.input}`
            }
            name="amount"
            type="text"
            value={state.amount}
            onChange={handleOnChange}
          />
        </div>
        <button
          className={styles.button}
          type="submit"
          disabled={!state.amount || !state.wallet_id || !state.agent_name}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WalletTransferForm;
