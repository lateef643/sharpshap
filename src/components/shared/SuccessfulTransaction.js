import React from "react";
import check from "../../assets/images/check.svg";
import style from './SuccessfulTransaction.module.scss';

const SuccessfulTransaction = (props) => (
  <div className={style.container}>
    <div className={style.sectionContainer} >
      <div>
        <img src={check} alt="green checkmark" />
        <p>Transaction Successful</p>
      </div>
      <div>
        <span>Amount</span>
        <span>{props.amount}</span>
      </div>
      <div>
        <span>Reference Code</span>
        <span>{props.referenceCode}</span>   
      </div>
      <div>    
        <span>Transaction Date</span>
        <span>{props.transactionDate}</span> 
      </div> 
      <div>    
        <span>Transaction Type</span>
        <span>{props.transactionType}</span> 
      </div>       
      <div>    
        <span>Total</span>
        <span>{props.total}</span> 
      </div> 
    </div>    
  </div>
);

export default SuccessfulTransaction;