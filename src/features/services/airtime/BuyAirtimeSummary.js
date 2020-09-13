import React from "react";
import PropTypes from "prop-types";

import formatToCurrency from "../../../util/formatToCurrency";
import Loader from "../../../components/util/Loader";

import style from "./BuyAirtimeSummary.module.scss";

export const BuyAirtimeSummary = (props) => {
  const {
    AirtimePurchaseFormState,
    selectedNetworkName: network,
    loading,
    handleOnSubmit,
    transactionCost,
  } = props;
  const { phone, amount } = AirtimePurchaseFormState;

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
        <span>234{phone}</span>
      </div>
      <div>
        <span>Transaction:</span>
        <span>Airtime Purchase</span>
      </div>
      <div>
        <span>Network:</span>
        <span>{network}</span>
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

BuyAirtimeSummary.propTypes = {
  AirtimePurchaseFormState: PropTypes.object.isRequired,
  selectedNetworkName: PropTypes.string.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  transactionCost: PropTypes.number.isRequired,
};

export default BuyAirtimeSummary;
