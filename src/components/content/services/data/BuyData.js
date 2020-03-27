import React, { useState } from "react";
import style from './BuyData.module.scss';

const BuyData = (props) => {
  const networks = [{ name: "MTN"}, { name: 'Airtel'}, {name: "Etisalat"}, {name: "Glo"}];
  const plans = ['Ultimate Plan', 'Medium Plan', 'Big Daddy', 'Flex Plan'];
  const [network, setNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dataPlan, setDataPlan] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({
      network,
      dataPlan,
      phoneNumber
    })
  };

  const handleNetworkChange = (e) => {
    const newNetworkName = e.target.value;
    setNetwork(newNetworkName);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
  };

  const handleDataPlanChange = (e) => {
    const newDataPlan = e.target.value;
    setDataPlan(newDataPlan);
  };

  return (
  <div className={style.buyData}>
    <form className={style.form} onSubmit={handleOnSubmit} >
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
        <span>Phone Number</span>
        <input type="text" onChange={handlePhoneNumberChange} />      
      </label>    
      <label>
        <span>Data Plan</span>
        <select onChange={handleDataPlanChange}>
          <option>Select Data Plan</option>
          {plans.map((plan, index) => {
            return <option value={plan} key={index}>{plan}</option>
          })}
        </select>      
      </label> 
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

export default BuyData;