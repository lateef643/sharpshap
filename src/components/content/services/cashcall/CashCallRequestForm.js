import React from "react";

import cashcall from "../../../../assets/images/cashcall2.svg";

import styles from "./CashCallRequestForm.module.scss";

export const CashCallRequestForm = ({
  dispatch,
  loading,
  cashCallState,
  cashCallType,
  handleOnRequestFormSubmit,
}) => {
  const handleProceed = (e) => {
    e.preventDefault();

    const { amount, phone, total } =
      cashCallType === "1" ? cashCallState.post : cashCallState.accept;

    if (amount && phone && total) {
      handleOnRequestFormSubmit();
    }
  };

  const handleUpdateState = ({ target }) => {
    if (target.name === "amount" && !isNaN(parseInt(target.value))) {
      if (cashCallType === "1") {
        dispatch({
          type: "UPDATE_POST_CASHCALL_STATE",
          payload: { [target.name]: target.value },
        });
      } else if (cashCallType === "2") {
        dispatch({
          type: "UPDATE_ACCEPT_CASHCALL_STATE",
          payload: { [target.name]: target.value },
        });
      }
    } else {
      if (cashCallType === "1") {
        dispatch({
          type: "UPDATE_POST_CASHCALL_STATE",
          payload: { [target.name]: target.value },
        });
      } else if (cashCallType === "2") {
        dispatch({
          type: "UPDATE_ACCEPT_CASHCALL_STATE",
          payload: { [target.name]: target.value },
        });
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleProceed(e);
        }}
        className={styles.form}
        autoComplete="off"
      >
        <img src={cashcall} alt="cash request icon" />
        <div>
          <label>Amount</label>
          <input
            name="amount"
            value={
              cashCallType === "1"
                ? cashCallState.post.amount
                : cashCallState.accept.amount
            }
            type="text"
            onChange={handleUpdateState}
          />
        </div>
        <div>
          <label>Cash Type</label>
          <select>
            <option value="">
              {cashCallType === "1"
                ? "Cash into your account"
                : "Physical Cash"}
            </option>
          </select>
        </div>
        <div>
          <label>Admin Fee</label>
          <input
            name="total"
            value={
              cashCallType === "1"
                ? cashCallState.post.adminFee
                : cashCallState.accept.adminFee
            }
            type="text"
            onChange={handleUpdateState}
            disabled
          />
        </div>
        <div>
          <label>Total</label>
          <input
            name="total"
            value={
              cashCallType === "1"
                ? cashCallState.post.total
                : cashCallState.accept.total
            }
            type="text"
            onChange={handleUpdateState}
            disabled
          />
        </div>
        <button type="submit">{loading ? "Please wait..." : "Proceed"}</button>
      </form>
    </div>
  );
};

export default CashCallRequestForm;