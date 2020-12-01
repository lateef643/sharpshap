import React from "react";

import formatToCurrency from "../../../utils/formatToCurrency";
import { ThreeDots } from "svg-loaders-react";

import style from "./WalletTransferSummary.module.scss";

export const WalletTransferSummary = ({
  state,
  loading,
  handleWalletTransfer,
}) => {
  const { amount, wallet_id, agent_name } = state;

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
        <span>Wallet ID:</span>
        <span>{wallet_id}</span>
      </div>
      <div>
        <span>Agent Name:</span>
        <span>{agent_name}</span>
      </div>
      <div>
        <span>Amount:</span>
        <span>{formatToCurrency(amount)}</span>
      </div>
      <div>
        <span>Transaction Cost:</span>
        <span>{formatToCurrency(0)}</span>
      </div>
      <div className={style.total}>
        <span>Total:</span>
        <span>{formatToCurrency(amount)}</span>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleWalletTransfer();
        }}
      >
        {loading ? <ThreeDots /> : "Continue"}
      </button>
    </div>
  );
};

export default WalletTransferSummary;
