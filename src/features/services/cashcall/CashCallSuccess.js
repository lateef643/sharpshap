import React from "react";

import check from "../../../assets/images/check.svg";

import styles from "./CashCallSucess.module.scss";

export const CashCallSuccess = ({ cashCallType, cashCallCompleteStatus }) => {
  return (
    <div className={styles.container}>
      <img src={check} alt="check icon" />
      <h3>Success!</h3>
      <p>
        {cashCallType === "1"
          ? "We will notify you immediately we match you to an agent."
          : cashCallType === "2"
          ? "You have successfully accepted an opportunity, please check cashcall list to conclude transaction."
          : cashCallCompleteStatus === "cancel"
          ? "Cashcall cancelled"
          : "Cashcall completed successfully"}
      </p>
    </div>
  );
};

export default CashCallSuccess;
