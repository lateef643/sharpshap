import React from "react";
import style from './WalletLog.module.scss';

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
    <div className={style.container}>
      <div className={style.heading}>
        <span>Previous Balance</span>
        <span>Amount</span>
        <span>Current Balance</span>
        <span>Description</span>
        <span>Type</span>
        <span>Mode</span>
        <span>Date Created</span>
      </div>
      {transactions.map((transaction, index) => ( 
        <div key={index} className={style.log}>
          <span>&#8358;{transaction.previousBalance}</span>
          <span>&#8358;{transaction.amount}</span>
          <span>&#8358;{transaction.currentBalance}</span>
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