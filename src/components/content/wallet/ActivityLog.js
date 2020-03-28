import React from "react";
import style from './ActivityLog.module.scss';

const ActivityLog = (props) => {
  const transactions = [{
    status: 'failed',
    amount: "786,364",
    reference: "123456",
    type: "Transfer",
    customer: "sanwoolu@corona.com",
    agent: "A&B consortium",
    vendor: "Okeson",
    terminal: "tt8989",
  }, {
    status: 'pending',
    amount: "781,364",
    reference: "123456",
    type: "Transfer",
    customer: "sanwoolu@corona.com",
    agent: "A&B consortium",
    vendor: "Okeson",
    terminal: "tt8989",
  }, {
    status: 'failed',
    amount: "1,657,364",
    reference: "123456",
    type: "Transfer",
    customer: "sanwoolu@corona.com",
    agent: "A&B consortium",
    vendor: "Okeson",
    terminal: "tt8989",
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
  }, 3, 40);

  return (
    <div className={style.container}>
      <div className={style.heading}>
        <span>Status</span>
        <span>Amount</span>
        <span>Reference</span>
        <span>Type</span>
        <span>Customer</span>
        <span className={style.marginLeft}>Agent</span>
        <span>Vendor</span>
        <span>Terminal</span>
      </div>
      {transactions.map((transaction, index) => ( 
        <div key={index} className={style.card}>
          <span className={style.status}><span className={`${transaction.status === "failed" ? style.failed 
            : transaction.status === "pending" ? style.pending : style.success}`}></span></span>            
          <span>&#8358;{transaction.amount}</span>
          <span>{transaction.reference}</span>
          <span>{transaction.type}</span>
          <span>{transaction.customer}</span>
          <span className={style.marginLeft}>{transaction.agent}</span>
          <span>{transaction.vendor}</span>
          <span>{transaction.terminal}</span>
        </div> 
        )
      )}
  </div>
)};

export default ActivityLog;