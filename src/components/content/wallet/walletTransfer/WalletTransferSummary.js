import React from "react";

import formatToCurrency from "../../../../util/formatToCurrency";
import Loader from "../../../partials/Loader";

import style from "./WalletTransferSummary.module.scss";

export const WalletTransferSummary = ({
  agentId,
  agentName,
  amount,
  transactionCost,
  total,
  loading,
  handleOnSubmit,
}) => {
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
        <span>Agent ID:</span>
        <span>{agentId}</span>
      </div>
      <div>
        <span>Agent Name:</span>
        <span>{agentName}</span>
      </div>
      <div>
        <span>Amount:</span>
        <span>{formatToCurrency(amount)}</span>
      </div>
      <div>
        <span>Transaction Cost:</span>
        <span>{formatToCurrency(transactionCost)}</span>
      </div>
      <div className={style.total}>
        <span>Total:</span>
        <span>{formatToCurrency(total)}</span>
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

export default WalletTransferSummary;
