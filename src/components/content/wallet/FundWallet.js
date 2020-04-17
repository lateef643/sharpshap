import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Loader from "../../partials/Loader";
import { setCurrentPage } from "../../../actions/page";
import FundWalletStatus from "./FundWalletStatus";
import style from './FundWallet.module.scss';

const banks = [{"code":"100","id":18,"name":"Suntrust Bank"}, {"code":"044","id":1,"name":"Access Bank"},
{"code":"070","id":6,"name":"Fidelity Bank"}];

export const FundWallet = ({ changeCurrentPage }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Fund Wallet",
      search: false
    });
  }, [changeCurrentPage]);

  const [bankCode, setBankCode] = useState("");
  const [tellerNumber, setTellerNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({
      bankCode,
      tellerNumber,
      amount
    });

    const payload = {
      bank: bankCode,
      teller_number: tellerNumber,
      amount
    }

    axios.post('', payload)
      .then(res => {
        setLoading(false);
        setRequestStatus(true);
      })
      .catch(err => {
        setLoading(false);
      })
  };

  const handleBankCodeChange = (e) => {
    let newBankCode = e.target.value;
    setBankCode(newBankCode);
  };

  const handleTellerNumberChange = (e) => {
    const newTellerNumber = e.target.value;
    setTellerNumber(newTellerNumber);
  }

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(Number(newAmount));
  }

  return (
    <div className={style.container}>{
      requestStatus ? <FundWalletStatus /> :
      <form className={style.form} onSubmit={handleOnSubmit} >
        <label>
          <span>Amount</span>
          <input type="number" onChange={handleAmountChange} />      
        </label> 
        <label>
          <span>Bank</span>
          <select onChange={handleBankCodeChange}>   
            <option value="">Select Bank</option>
            {banks.map(bank => {
              return <option value={bank.code} key={bank.code}>{bank.name}  0012345678 CicoServe Payment</option>
            })}
          </select>
        </label>
        <label>
          <span>Teller Number</span>
          <input type="text" onChange={handleTellerNumberChange} />
        </label>    
        <button type="submit">{loading ? <Loader size="small" color="white" position="center" /> : "Submit" }</button>
    </form>}  
  </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
}
export default connect(undefined, mapDispatchToProps)(FundWallet);