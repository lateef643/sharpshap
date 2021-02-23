import React from "react";
import PropTypes from "prop-types";

import formatToCurrency from "../../../util/formatToCurrency";
import Loader from "../../../components/util/Loader";

import style from "./ElectricityPaymentSummary.module.scss";

export const ElectricityPaymentSummary = (props) => {
  const {
    ElectricityPaymentFormState: state,
    handleOnSubmit,
    loading,
    transactionCost,
  } = props;
  const { disco, meterNo, accountName, paymentPlan, amount, phone } = state;

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
        <span>Disco:</span>
        <span>{disco}</span>
      </div>
      <div>
        <span>Meter Number:</span>
        <span>{meterNo}</span>
      </div>
      <div>
        <span>Account Name:</span>
        <span>{accountName}</span>
      </div>
      <div>
        <span>Plan:</span>
        <span>{paymentPlan}</span>
      </div>
      <div>
        <span>Phone No:</span>
        <span>{phone}</span>
      </div>
      <div>
        <span>Amount:</span>
        <span>{formatToCurrency(amount)}</span>
      </div>
      <div>
        <span>Transaction cost:</span>
        <span>{formatToCurrency(transactionCost)}</span>
      </div>
      <div className={style.total}>
        <span>Total</span>
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

ElectricityPaymentSummary.propTypes = {
  ElectricityPaymentFormState: PropTypes.object.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  transactionCost: PropTypes.number.isRequired,
};

export default ElectricityPaymentSummary;
