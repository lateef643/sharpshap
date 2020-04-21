import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setCurrentPage } from "../../../../actions/page";
import { FUND_WALLET_REQUEST } from "../../../../store/api/constants";
import FundWalletStatus from "./FundWalletStatus";
import FundWalletSummary from "./FundWalletSummary";
import FundWalletRequestForm from "./FundWalletRequestForm";
import style from './FundWallet.module.scss';

export const FundWallet = ({ changeCurrentPage }) => {
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState("form");
  const [bankCode, setBankCode] = useState("");
  const [tellerNumber, setTellerNumber] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);

  useEffect(() => {
    changeCurrentPage({
      heading: "Fund Wallet",
      search: false
    });
  }, [changeCurrentPage]);

  const handleOnSubmit = () => {
    setLoading(true);

    const payload = {
      bank: bankCode,
      teller_number: tellerNumber,
      amount
    };

    axios.post(FUND_WALLET_REQUEST, payload)
      .then(res => {
        setLoading(false);
        setRequestStatus(true);
        setComponentToRender("status");
      })
      .catch(err => {
        setLoading(false);
        setRequestStatus(false);
        setComponentToRender("status");
      })
  };

  const handleTellerNumberChange = (e) => {
    const newTellerNumber = e.target.value;
    setTellerNumber(newTellerNumber);
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(Number(newAmount));
  };

  switch(componentToRender) {
    case "form":
      renderedComponent = <FundWalletRequestForm 
        handleAmountChange={handleAmountChange}
        handleTellerNumberChange={handleTellerNumberChange}
        setComponentToRender={setComponentToRender}
        setBankCode={setBankCode}
        tellerNumber={tellerNumber}
        amount={amount}
        bankCode={bankCode}
        loading={loading}
        setAccountName={setAccountName}
        setAccountNumber={setAccountNumber}
        setBank={setBank}
      />
      break;
    case "summary":
      renderedComponent = <FundWalletSummary 
        tellerNumber={tellerNumber}
        amount={amount}
        bank={bank}
        accountName={accountName}
        accountNumber={accountNumber}
        handleOnSubmit={handleOnSubmit}
        loading={loading}
      />;
      break;
    case "status":
      renderedComponent = <FundWalletStatus 
        requestStatus={requestStatus}
      />;
      break;
    default:
      renderedComponent = null;
  };

  return (
    <div className={style.container}>
      {renderedComponent} 
    </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
}
export default connect(undefined, mapDispatchToProps)(FundWallet);