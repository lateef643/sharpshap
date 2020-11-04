import React from "react";
import PropTypes from "prop-types";

import formatToCurrency from "../../../util/formatToCurrency";
import Loader from "../../../components/util/Loader";

import style from "./RechargeCableSummary.module.scss";

export const RechargeCableSummary = (props) => {
  const {
    RechargeCableFormState: state,
    loading,
    handleOnSubmit,
    transactionCost,
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
        <span>Service:</span>
        <span>{state.provider}</span>
      </div>
      <div>
        <span>Plan:</span>
        <span>{state.selectedPlanName}</span>
      </div>
      <div>
        <span>Account Name:</span>
        <span>{state.customerName}</span>
      </div>
      <div>
        <span>Smart card:</span>
        <span>{state.smartCardNumber}</span>
      </div>
      <div>
        <span>Plan Duration:</span>
        <span>{state.selectedPlanDuration}</span>
      </div>
      <div>
        <span>Amount:</span>
        <span>{formatToCurrency(state.amount)}</span>
      </div>
      <div>
        <span>Transaction cost:</span>
        <span>{formatToCurrency(transactionCost)}</span>
      </div>
      <div className={style.total}>
        <span>Total:</span>
        <span>{formatToCurrency(state.amount)}</span>
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

RechargeCableSummary.propTypes = {
  RechargeCableFormState: PropTypes.object,
  loading: PropTypes.bool,
  handleOnSubmit: PropTypes.func,
  transactionCost: PropTypes.number,
};

export default RechargeCableSummary;
