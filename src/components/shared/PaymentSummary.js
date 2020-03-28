import React from "react";
import style from './PaymentSummary.module.scss';

const PaymentSummary = (props) => (
  <div className={style.container}>
    <div className={style.paymentContainer} >
      <div>
        <span>Phone Number</span>
        <span>{props.phoneNumber}</span>
      </div>
      <div>
        <span>Amount</span>
        <span>{props.amount}</span>   
      </div>
      <div>    
        <span>Total</span>
        <span>{props.total}</span> 
      </div> 
      <button onClick={(e) => {
        e.preventDefault();
        props.handleOnSubmit();
        props.handleSetPage("success");
      }}>Continue</button>       
    </div>    
  </div>
);

export default PaymentSummary;