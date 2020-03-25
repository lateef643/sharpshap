import React, { useState } from "react";
import Access from "../../../../assets/images/download (10).png";
import './BankForm.scss';

const WithdrawForm = (props) => {
  const banks = ["Access Bank", "First Bank", "Guarantee Trust Bank", "Stanbic IBTC"];
  const [bank, setBank] = useState("Beneficiary Bank");

  const bankImageUrl = bank.split(" ")[0];

  return (
  <div className="withdraw-funds">
    <form className="form withdraw-funds__form" onSubmit={(e) => {
      e.preventDefault();
      props.handleSetPage("summary");
    }} >
      {bank !== " Bank" ? <img className="withdraw-funds__form__image" 
      src={Access} alt={`${bank} logo`} /> : undefined}
      <label>
        <span>{bank}</span>
        <select onChange={(e) =>{
          const bank = e.target.value;
          setBank(bank);
          props.handleBeneficiaryBankChange(bank);
        }}>
          <option value="Beneficiary Bank" >Select Bank</option>
          {banks.map((bank, index) => {
            return <option key={index} value={bank}>{bank}</option>
          })}
        </select>
      </label>
      <label>
        <span>Beneficiary Account Number</span>
        <input type="text" onChange={(e) => {
          const accountNumber = e.target.value;
          props.handleBeneficiaryAccountNumberChange(accountNumber);
        }} />      
      </label>
      <label>
        <span>Beneficiary Account Name</span>
        <input type="text" onChange={(e) => {
          const accounName = e.target.value;
          props.handleBeneficiaryAccountNameChange(accounName);
        }} />      
      </label>      
      <label>
        <span>Amount</span>
        <input type="text" onChange={(e) => {
          const amount = e.target.value;
          props.handleAmountChange(amount);
        }} />      
      </label>
      <label>
        <span>Customer's Number</span>
        <input type="text" onChange={(e) => {
          const customersNumber = e.target.value;
          props.handleCustomersNumberChange(customersNumber);
        }} />      
      </label>    
      <label>
        <span>Narration</span>
        <input type="text" onChange={(e) => {
          const narration = e.target.value;
          props.handleNarrationChange(narration);
        }} />      
      </label>        
      <button type="submit">Continue</button>
    </form>    
  </div>
)}

export default WithdrawForm;