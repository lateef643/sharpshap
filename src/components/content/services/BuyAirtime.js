import React, { useState } from "react";
import './BuyAirtime.scss';

const BuyAirtime = (props) => {
  const networks = [{ name: "MTN"}, { name: 'Airtel'}, {name: "Etisalat"}, {name: "Glo"}];
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({
      network,
      amount,
      phoneNumber
    })
  };

  const handleNetworkChange = (e) => {
    const newNetworkName = e.target.value;
    setNetwork(newNetworkName);
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
  };

  return (
  <div className="buy-airtime">
    <form className="form buy-airtime__form" onSubmit={handleOnSubmit} >
      <label>
        <span>Network</span>
        <select onChange={handleNetworkChange}>
          <option>Select Network</option>
          {networks.map((network, index) => {
            return <option value={network.name} key={index}>{network.name}</option>
          })}
        </select>      
      </label>
      <label>
        <span>Amount</span>
        <input type="text" onChange={handleAmountChange} />      
      </label>    
      <label>
        <span>Phone Number</span>
        <input type="text" onChange={handlePhoneNumberChange} />      
      </label>  
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

export default BuyAirtime;