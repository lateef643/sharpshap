import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_BANK_LIST } from "../../../../store/api/constants";
import { VERIFY_ACCOUNT } from "../../../../store/api/constants";
import Access from "../../../../assets/images/download (10).png";
import UBA from "../../../../assets/images/uba_0.svg"
import Fidelity from "../../../../assets/images/cea20b8d-new-fidelity-bank-logo.svg";
import FirstBank from "../../../../assets/images/206-2069035_firstbank-logos-first-bank-of-nigeria-logo-1.svg";
import Union from "../../../../assets/images/ng-ubn-logo.svg";
import Zenith from "../../../../assets/images/zenith-bank-logo.svg";
import GTBank from "../../../../assets/images/gtbank_rwanda_logo.svg";

import style from './BankForm.module.scss';

const WithdrawForm = (props) => {
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState("Beneficiary Bank");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [errors, setErrors] = useState({
    bank: true,
    accountName: true,
    accountNumber: true,
    amount: true,
    customersNumber: true,
    narration: true
  });

  useEffect(() => {
    axios.get(GET_BANK_LIST)
      .then(res => {
        const banks = res.data.data;
        setBanks(banks);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    const payload = {
      "account_number" : accountNumber,
      "bank_code" : bank,
      "amount": Number(props.amount)
    };

    if (accountNumber.length === 10) {
      axios.post(VERIFY_ACCOUNT, payload)
        .then(res => {
          const accountName = res.data.data.data.account_info.accountName;
          setAccountName(accountName);
          setErrors({...errors, accountName: false});
        })
        .catch(err => {
          console.log(err);
        })      
    }

  }, [accountNumber]);

  //Dynamically render bank logo
  let bankImageUrl = "";

  bankImageUrl = bank === "044" ? Access : bank === "058" ?  GTBank
  : bank === "011" ? FirstBank : bank === "033" ? UBA 
  : bank === "070" ? Fidelity : bank === "032" ? Union
  : bank === "057" ? Zenith : "";

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
    {bank !== "Beneficiary Bank" ? <img className={style.image} 
      src={bankImageUrl} alt={`${bank} logo`} /> : undefined}
      <label>
        <span>Beneficiary Bank</span>
        <select onChange={(e) =>{
          const bankName = e.target.value;

          if (bankName.trim().length > 0) {
            props.handleBeneficiaryBankChange(bankName.trim());  
            setErrors({...errors, bank: false});
            setBank(bankName.trim());
          };
        }}>
          <option value="Beneficiary Bank">Select Bank</option>
          {banks.map((bank, index) => {
            return <option key={index} value={bank.bank_code}>{bank.bank_name}</option>
          })}
        </select>
      </label>
      <label>
        <span>Beneficiary Account Number</span>
        <input type="text" onChange={(e) => {
          const accountNumber = e.target.value;

          if (accountNumber.trim().length > 0) {
            setAccountNumber(accountNumber);
            props.handleBeneficiaryAccountNumberChange(accountNumber.trim());  
            setErrors({...errors, accountNumber: false});  
          };
        }} />      
      </label>
      <label>
        <span>Beneficiary Account Name</span>
        <input type="text" value={accountName} disabled={true} />      
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