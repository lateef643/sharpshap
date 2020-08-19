import React from "react";
import PropTypes from "prop-types";

import formatToCurrency from "../../../util/formatToCurrency";
import Loader from "../../../components/util/Loader";

import style from "./FundsTransferSummary.module.scss";

export const FundsTransferSummary = (props) => {
  const {
    FundsTransferFormState: state,
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
        <span>Account Name:</span>
        <span>{state.accountName}</span>
      </div>
      <div>
        <span>Bank:</span>
        <span>{state.beneficiaryBankName}</span>
      </div>
      <div>
        <span>Account Number:</span>
        <span>{state.accountNumber}</span>
      </div>
      <div>
        <span>Phone Number:</span>
        <span>{state.phone}</span>
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
        <span>{formatToCurrency(state.total)}</span>
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

FundsTransferSummary.propTypes = {
  FundsTransferFormState: PropTypes.object,
  loading: PropTypes.bool,
  handleOnSubmit: PropTypes.func,
  transactionCost: PropTypes.number,
};

export default FundsTransferSummary;
