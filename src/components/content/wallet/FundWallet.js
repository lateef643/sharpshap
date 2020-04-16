import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Loader from "../../partials/Loader";
import { setCurrentPage } from "../../../actions/page";
import FundWalletStatus from "./FundWalletStatus";
import style from './FundWallet.module.scss';

export const FundWallet = ({ changeCurrentPage }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Fund Wallet",
      search: false
    });
  }, [changeCurrentPage]);

  const [bankDetails, setBankDetails] = useState("");
  const [tellerNumber, setTellerNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({
      bankDetails,
      tellerNumber,
      amount
    });

    const payload = {
      bank: bankDetails.bank,
      accountNumber: bankDetails.accountNumber,
      tellerNumber,
      amount
    }

    axios.post('', payload)
      .then(res => {
        console.log(res);
        setLoading(false);
        setRequestStatus(true);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  };

  const handleBankDetailsChange = (e) => {
    let newBankDetails;

    if (e.target.value !== "") {
      newBankDetails = JSON.parse(e.target.value);
    }
    
    setBankDetails(newBankDetails);
  };

  const handleTellerNumberChange = (e) => {
    const newTellerNumber = e.target.value;
    setTellerNumber(newTellerNumber);
  }

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
  }

  return (
    <div className={style.container}>{
      requestStatus ? <FundWalletStatus /> :
      <form className={style.form} onSubmit={handleOnSubmit} >
        <label>
          <span>Amount</span>
          <input type="text" onChange={handleAmountChange} />      
        </label> 
        <label>
          <span>Bank</span>
          <select onChange={handleBankDetailsChange}>   
            <option value="">Select Bank</option>
            <option value={JSON.stringify({bank: "Suntrust bank", accountNumber: "0012345678" })}>Suntrust Bank  0012345678 CicoServe Payment</option>
            <option value={JSON.stringify({bank: "Access bank", accountNumber: "0012345678" })}>Access Bank 0012345678 CicoServe Payment</option>
            <option value={JSON.stringify({bank: "Fidelity bank", accountNumber: "0012345678" })}>Fidelity Bank 0012345678 CicoServe Payment</option>
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