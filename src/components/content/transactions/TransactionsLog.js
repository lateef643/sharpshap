import React from "react";
import './TransactionsLog.scss';

const TransactionLog = (props) => {
  const transactions = [{
    status: 'pending',
    amount: "500",
    reference: "428333",
    type: "Airtime",
    customer: "naruto@covid.com",
    agent: "Saitama",
    vendor: "Goku",
    terminal: "jp8738",   
  }, {
    status: 'failed',
    amount: "9,000",
    reference: "787637",
    type: "Withdrawal",
    customer: "slim@fatboys.co",
    agent: "Area fada & Sons",
    vendor: "Scatter",
    terminal: "ht6573",
  }];
  transactions.length = 20;
  transactions.fill({
    status: 'success',
    amount: "657,364",
    reference: "123456",
    type: "Transfer",
    customer: "sanwoolu@corona.com",
    agent: "A&B consortium",
    vendor: "Okeson",
    terminal: "tt8989",
  }, 2, 20);

  return (
    <div className="list-transactions">
      <div className="list-transactions__heading">
        <span>Status</span>
        <span>Amount</span>
        <span>Reference</span>
        <span>Type</span>
        <span>Customer</span>
        <span>Agent</span>
        <span>Vendor</span>
        <span>Terminal</span>
      </div>
      {transactions.map((transaction, index) => ( 
        <div key={index} className="list-transactions__content">
          <span className={`list-transactions__content__status list-transactions__content__status--${transaction.status}`}></span>
          <span>&#8358;{transaction.amount}</span>
          <span>{transaction.reference}</span>
          <span>{transaction.type}</span>
          <span>{transaction.customer}</span>
          <span>{transaction.agent}</span>
          <span>{transaction.vendor}</span>
          <span>{transaction.terminal}</span>
        </div> 
        )
      )}
  </div>
)};

export default TransactionLog;