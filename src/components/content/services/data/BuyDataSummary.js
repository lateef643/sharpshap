import React from "react";
// import { connect } from "react-redux";
import Loader from "../../../partials/Loader";
import style from "./BuyDataSummary.module.scss";
import formatToCurrency from "../../../../util/formatToCurrency";

export const BuyDataSummary = (props) => {
  const {
    telcoName,
    amount,
    phone,
    loading,
    handleOnSubmit,
    selectedDataPlanName,
    selectedDataPlanValidity,
  } = props;

  return (
    <div className={style.paymentContainer}>
      <div className={style.heading}>
        <h2 className={style.headingText}>Transaction Summary</h2>
      </div>
      <div>
        {loading ? (
          <p className={style.pending}>
            Please wait while your transaction is processing...
          </p>
        ) : undefined}
      </div>
      <div>
        <span>Phone Number:</span>
        <span>{phone}</span>
      </div>
      <div>
        <span>Network:</span>
        <span>{telcoName}</span>
      </div>
      <div>
        <span>Data Bundle:</span>
        <span>{selectedDataPlanName}</span>
      </div>
      <div>
        <span>Validity:</span>
        <span>{selectedDataPlanValidity}</span>
      </div>
      <div>
        <span>Amount:</span>
        <span>{formatToCurrency(amount)}</span>
      </div>
      <div>
        <span>Transaction cost:</span>
        <span>{formatToCurrency(0)}</span>
      </div>
      <div className={style.total}>
        <span>Total:</span>
        <span>{formatToCurrency(amount)}</span>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {loading ? (
          <Loader size="small" color="white" position="center" />
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
};

export default BuyDataSummary;
