import React from "react";

import formatToCurrency from "../../../../util/formatToCurrency";

import styles from "./CashCallRequestForm.module.scss";

export const CashCallRequestForm = ({ dispatch, verificationLoading, cashCallState, verifyCashCall}) => {
  const handleProceed = (e) => {
    e.preventDefault();
    verifyCashCall();
  }

  const handleUpdateState = ({ target }) => {
    dispatch({
      type: "UPDATE_REQUEST_STATE",
      payload: { [target.name]: target.value }
    })
  }

  return (
    <div>
      <form onSubmit={handleProceed} className={styles.form} autoComplete="off">
        <div>
          <label>Verification Code</label>
          <input 
            name="token"
            value={cashCallState.token}
            type="text"
            onChange={handleUpdateState}
          />
        </div>
        <button type="submit">{verificationLoading ? "Please wait" : "Complete"}</button>
      </form>
    </div>
  )
}

export default CashCallRequestForm;