import React from "react";

import cashcall from "../../../../assets/images/cashcall2.svg";

import styles from "./CashCallRequestForm.module.scss";

export const CashCallRequestForm = ({ dispatch, loading, cashCallState, requestCash}) => {
  const handleProceed = (e) => {
    e.preventDefault();

    const { amount, phone, total } = cashCallState;

    if (amount && phone && total) {
      requestCash();
    }
  }

  const handleUpdateState = ({ target }) => {
    if (target.name === "amount" && !isNaN(parseInt(target.value))) {
      dispatch({
        type: "UPDATE_REQUEST_STATE",
        payload: { [target.name]: target.value }
      })      
    } else {
      dispatch({
        type: "UPDATE_REQUEST_STATE",
        payload: { [target.name]: target.value }
      })       
    }
  }

  return (
    <div>
      <form onSubmit={handleProceed} className={styles.form} autoComplete="off">
        <img src={cashcall} alt="cash request icon" />
        <div>
          <label>Amount</label>
          <input 
            name="amount"
            value={cashCallState.amount}
            type="text"
            onChange={handleUpdateState}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input 
            name="phone"
            value={cashCallState.phone}
            type="text"
            onChange={handleUpdateState}
          />
        </div>
        <div>
          <label>Total</label>
          <input 
            name="total"
            value={cashCallState.total}
            type="text"
            onChange={handleUpdateState}
            disabled
          />
        </div>
        <button type="submit">{loading ? "Please wait..." : "Proceed"}</button>
      </form>
    </div>
  )
}

export default CashCallRequestForm;