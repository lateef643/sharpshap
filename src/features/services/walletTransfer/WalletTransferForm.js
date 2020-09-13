import React, { useEffect, useState } from "react";
import axios from "axios";
import VerificationLoader from "../../../components/util/VerificationLoader";
import wallet from "../../../assets/images/wallet-svgrepo-com.svg";
import styles from "./WalletTransferForm.module.scss";
import { VALIDATE_AGENT } from "../../../store/api/constants";

export const WalletTransferForm = (props) => {
  const { dispatch, state, setStatus } = props;
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [error, setError] = useState(false);

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
        <div className={styles.imageContainer}>
          <img src={wallet} className={styles.image} alt="" />
        </div>
        <label>
          <span>Wallet ID</span>
          <input
            name="wallet_id"
            type="text"
            value={state.wallet_id}
            className={styles.outlineGrey}
            onChange={handleOnChange}
          />
        </label>
        <label>
          <span>Agent Name</span>
          <input
            name="agent_name"
            type="text"
            value={state.agent_name}
            className={styles.outlineGrey}
            readOnly={true}
            onChange={handleOnChange}
          />
          {verificationLoading && (
            <span className={styles.loader}>
              <VerificationLoader />
            </span>
          )}
          {error && (
            <p className={styles.validationErrorText}>
              Account validation failed, please try again.
            </p>
          )}
        </label>
        <label>
          <span>Amount</span>
          <input
            name="amount"
            type="text"
            value={state.amount}
            className={styles.outlineGrey}
            onChange={handleOnChange}
          />
        </label>
        {state.amount && state.wallet_id && state.agent_name && (
          <button>Submit</button>
        )}
      </form>
    </div>
  );
};

export default WalletTransferForm;