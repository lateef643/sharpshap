import React from "react";

// import formatToCurrency from "../../../../util/formatToCurrency";

import styles from "./PostCashCallForm.module.scss";

export const PostCashCallForm = ({
  dispatch,
  verificationLoading,
  cashCallState,
  cashCallType,
  handleOpportunity,
  cancelCashcall,
  releaseFunds,
  cashCallCompleteStatus,
  error,
}) => {
  console.log(cashCallType, "a la carte");
  console.log("ladida");
  const handleProceed = (e) => {
    e.preventDefault();

    const token =
      cashCallType === "post"
        ? cashCallState.post.token
        : cashCallState.accept.token;

    if (
      (cashCallType === "post" || cashCallType === "accept") &&
      cashCallCompleteStatus === null &&
      token
    ) {
      handleOpportunity();
    } else if (cashCallCompleteStatus === "release") {
      releaseFunds();
    } else if (cashCallCompleteStatus === "cancel") {
      cancelCashcall();
    }
  };

  const handleUpdateState = ({ target }) => {
    if (cashCallType === "post") {
      dispatch({
        type: "UPDATE_POST_CASHCALL_STATE",
        payload: { [target.name]: target.value },
      });
    } else if (cashCallType === "accept") {
      dispatch({
        type: "UPDATE_ACCEPT_CASHCALL_STATE",
        payload: { [target.name]: target.value },
      });
    } else if (cashCallCompleteStatus === "release") {
      dispatch({
        type: "UPDATE_RELEASE_FUNDS_STATE",
        payload: { [target.name]: target.value },
      });
    } else if (cashCallCompleteStatus === "cancel") {
      dispatch({
        type: "UPDATE_CANCEL_CASHCALL_STATE",
        payload: { [target.name]: target.value },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleProceed} className={styles.form} autoComplete="off">
        <p>Please enter Code to debit your wallet</p>
        <div>
          <label>Verification Code</label>
          <input
            name="token"
            value={
              cashCallType === "post"
                ? cashCallState.post.token
                : cashCallType === "accept"
                ? cashCallState.accept.token
                : cashCallCompleteStatus === "release"
                ? cashCallState.release.token
                : cashCallCompleteStatus === "cancel"
                ? cashCallState.cancel.token
                : undefined
            }
            type="text"
            onChange={handleUpdateState}
          />
        </div>
        <p className={styles.errorText}>{error}</p>
        <button type="submit">
          {verificationLoading ? "Please wait" : "Complete"}
        </button>
      </form>
    </div>
  );
};

export default PostCashCallForm;
