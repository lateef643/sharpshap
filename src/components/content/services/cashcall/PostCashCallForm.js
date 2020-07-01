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
}) => {
  const handleProceed = (e) => {
    e.preventDefault();

    const token =
      cashCallType === "1"
        ? cashCallState.post.token
        : cashCallState.accept.token;

    if (
      (cashCallType === "1" || cashCallType === "2") &&
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
              cashCallType === "1"
                ? cashCallState.post.token
                : cashCallType === "2"
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
        <button type="submit">
          {verificationLoading ? "Please wait" : "Complete"}
        </button>
      </form>
    </div>
  );
};

export default PostCashCallForm;
