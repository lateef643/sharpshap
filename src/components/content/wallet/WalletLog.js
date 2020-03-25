import React from "react";
import './WalletLog.scss';

const WalletLog = (props) => {
  const transactions = [];
  transactions.length = 20;
  transactions.fill({
    previousBalance: 3000,
    amount: 6500,
    currentBalance: 9500,
    description: "Funding by Cico Admin",
    type: "Credit",
    mode: "Funding by Cico Admin",
    createdAt: "March 25, 2020"
  }, 0, 20);

  return (
    <div className="wallet-log">
      <div className="wallet-log__heading">
        <span>Previous Balance</span>
        <span>Amount</span>
        <span>Current Balance</span>
        <span>Description</span>
        <span>Type</span>
        <span>Mode</span>
        <span>Date Created</span>
      </div>
      {transactions.map((transaction, index) => ( 
        <div key={index} className="wallet-log__content">
          <span>{transaction.previousBalance}</span>
          <span>{transaction.amount}</span>
          <span>{transaction.currentBalance}</span>
          <span>{transaction.description}</span>
          <span>{transaction.type}</span>
          <span>{transaction.mode}</span>
          <span>{transaction.createdAt}</span>
        </div> 
        )
      )}
  </div>
)};

export default WalletLog;