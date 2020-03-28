import React, { useState } from "react";
import Access from "../../../../assets/images/download (10).png";
import UBA from "../../../../assets/images/uba_0.svg"
import Fidelity from "../../../../assets/images/cea20b8d-new-fidelity-bank-logo.svg";
import FirstBank from "../../../../assets/images/206-2069035_firstbank-logos-first-bank-of-nigeria-logo-1.svg";
import Union from "../../../../assets/images/ng-ubn-logo.svg";
import Zenith from "../../../../assets/images/zenith-bank-logo.svg";
import GTBank from "../../../../assets/images/gtbank_rwanda_logo.svg";

import style from './BankForm.module.scss';

const WithdrawForm = (props) => {
  const banks = ["Access Bank", "First Bank", "Guarantee Trust Bank", "Stanbic IBTC", 
  "Fidelity Bank", "Union Bank of Nigeria", "Zenith Bank", "United Bank of Africa"];
  const [bank, setBank] = useState("Bank");
  const [errors, setErrors] = useState({
    bank: true,
    accountName: true,
    accountNumber: true,
    amount: true,
    customersNumber: true,
    narration: true
  });

  //Dynamically render bank logo
  let bankImageUrl = "";

  bankImageUrl = bank === 'Access Bank' ? Access : bank === "Guarantee Trust Bank" ?  GTBank
  : bank === "First Bank" ? FirstBank : bank === "United Bank of Africa" ? UBA 
  : bank === "Fidelity Bank" ? Fidelity : bank === "Union Bank of Nigeria" ? Union
  : bank === "Zenith Bank" ? Zenith : "";

  return (
  <div className={style.container}>
    <form className={style.form} onSubmit={(e) => {
      e.preventDefault();

      let hasError = true;
      
      for (let error in errors) {
        if (errors.hasOwnProperty(error)) {
          if (errors[error]) {
            hasError = true;
            break;            
          } else {
            hasError = false;
          }
        };
      };
      
      if (!hasError) {
        props.handleSetPage("summary");        
      }
    }} >
      {bank !== "Bank" ? <img className={style.image} 
      src={bankImageUrl} alt={`${bank} logo`} /> : undefined}
      <label>
        <span>{bank}</span>
        <select onChange={(e) =>{
          const bankName = e.target.value;

          if (bankName.trim().length > 0) {
            props.handleBankChange(bankName.trim());  
            setErrors({...errors, bank: false});
            setBank(bankName.trim());
          };
        }}>
          <option value="Bank">Select Bank</option>
          {banks.map((bank, index) => {
            return <option key={index} value={bank}>{bank}</option>
          })}
        </select>
      </label>
      <label>
        <span>Account Number</span>
        <input type="text" onChange={(e) => {
          const accountNumber = e.target.value;

          if (accountNumber.trim().length > 0) {
            props.handleAccountNumberChange(accountNumber.trim());  
            setErrors({...errors, accountNumber: false});  
          };
        }} />      
      </label>
      <label>
        <span>Account Name</span>
        <input type="text" onChange={(e) => {
          const accountName = e.target.value;

          if (accountName.trim().length > 0) {
            props.handleAccountNameChange(accountName.trim());  
            setErrors({...errors, accountName: false});  
          };
        }} />      
      </label>      
      <label>
        <span>Amount</span>
        <input type="text" onChange={(e) => {
          const amount = e.target.value;

          if (amount.trim().length > 0) {
            props.handleAmountChange(amount.trim());  
            setErrors({...errors, amount: false});  
          };
        }} />      
      </label>
      <label>
        <span>Customer's Number</span>
        <input type="text" onChange={(e) => {
          const customersNumber = e.target.value;

          if (customersNumber.trim().length > 0) {
            props.handleCustomersNumberChange(customersNumber.trim());  
            setErrors({...errors, customersNumber: false});  
          };
        }} />      
      </label>    
      <label>
        <span>Narration</span>
        <input type="text" onChange={(e) => {
          const narration = e.target.value;

          if (narration.trim().length > 0) {
            props.handleNarrationChange(narration.trim());  
            setErrors({...errors, narration: false});  
          };
        }} />      
      </label>        
      <button type="submit">Continue</button>
    </form>    
  </div>
)}

export default WithdrawForm;