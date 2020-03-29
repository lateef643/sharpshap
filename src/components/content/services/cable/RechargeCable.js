import React, { useState } from "react";
import { connect } from "react-redux";
import style from './RechargeCable.module.scss';
import { setCurrentPage } from "../../../../actions/page";

export const RechargeCable = ({ changeCurrentPage }) => {
  changeCurrentPage({
    heading: "Recharge Cable",
    search: false
  });

  const cableTvProviders = [{ name: "DSTV"}, { name: 'GOTV'}, {name: "StarTimes"}, {name: "HITV"}];
  const packages = ['Ultimate Plan', 'Medium Plan', 'Big Daddy', 'Flex Plan'];
  const [provider, setProvider] = useState("");
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [packageType, setPackageType] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({
      provider,
      smartCardNumber,
      packageType
    })
  };

  const handleProviderChange = (e) => {
    const newProviderName = e.target.value;
    setProvider(newProviderName);
  };

  const handleSmartCardNumberChange = (e) => {
    const newSmartCardNumber = e.target.value;
    setSmartCardNumber(newSmartCardNumber);
  };

  const handlePackageTypeChange = (e) => {
    const newPackageType = e.target.value;
    setPackageType(newPackageType);
  };

  return (
  <div className={style.container}>
    <form className={style.form} onSubmit={handleOnSubmit} >
      <label>
        <span>Provider</span>
        <select onChange={handleProviderChange}>
        <option>Select Provider</option>
        {cableTvProviders.map((cable, index) => {
          return <option value={cable.name} key={index}>{cable.name}</option>
        })}
        </select>      
      </label>
      <label>
        <span>Smart Card Number</span>
        <input type="text" onChange={handleSmartCardNumberChange} />      
      </label>    
      <label>
        <span>Packages</span>
        <select onChange={handlePackageTypeChange}>
        <option>Select Package</option>
        {packages.map((packageType, index) => {
          return <option value={packageType} key={index}>{packageType}</option>
        })}
        </select>      
      </label> 
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(RechargeCable);