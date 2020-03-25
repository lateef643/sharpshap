import React, { useState } from "react";
import './PaymentSummary.scss';

const PaymentSummary = (props) => (
  <div className="payment-summary">
    <div className="payment-summary-container" >
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
        e.preventDefault(e);
        props.handleOnSubmit();
        props.handleSetPage("success");
      }}>Continue</button>       
    </div>    
  </div>
);

export default PaymentSummary;