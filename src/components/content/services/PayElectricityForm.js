import React, { useState } from "react";
import './PayElectricity.scss';

const PayElectricity = (props) => {
  const [agentName, setAgentName] = useState("");
  const [walletNumber, setWalletNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({
      agentName,
      walletNumber,
      amount
    })
  };

  const handleAgentNameChange = (e) => {
    const newAgentName = e.target.value;
    setAgentName(newAgentName);
  };

  const handleWalletNumberChange = (e) => {
    const newWalletNumber = e.target.value;
    setWalletNumber(newWalletNumber);
  }

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
  }

  return (
  <div className="pay-electricity">
    <form className="form pay-electricity__form" onSubmit={handleOnSubmit} >
      <label>
        <span>Agent Name</span>
        <input type="text" onChange={handleAgentNameChange} />      
      </label>
      <label>
        <span>Wallet Number</span>
        <input type="text" onChange={handleWalletNumberChange} />      
      </label>    
      <label>
        <span>Amount</span>
        <input type="text" onChange={handleAmountChange} />      
      </label>        
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

export default PayElectricity;