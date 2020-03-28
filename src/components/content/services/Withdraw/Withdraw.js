import React, {useState} from "react";
import AmountForm from "./AmountForm";
import BankForm from "./BankForm";
import PaymentSummary from "../../../shared/PaymentSummary";
import SuccessfulTransaction from "../../../shared/SuccessfulTransaction";
import style from './Withdraw.module.scss';

const Withdraw = (props) => {
  const [page, setPage] = useState("amount");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [customersNumber, setCustomersNumber] = useState("");
  const [narration, setNarration] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBankChange = (bank) => {
    setBank(bank);
  };

  const handleAccountNumberChange = (accountNumber) => {
    setAccountNumber(accountNumber);
  };

  const handleAccountNameChange = (accountName) => {
    setAccountName(accountName);
  };

  const handleCustomersNumberChange = (customersNumber) => {
    setCustomersNumber(customersNumber);
  };
  
  const handleNarrationChange = (narration) => {
    setNarration(narration);
  };

  const handleAmountChange = (amount) => {
    const total = 89;

    setAmount(`${amount}`);
    setTotal(`${amount + total}`);
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const handleSetPage = (page) => {
    setPage(page);
  };

  const handleOnSubmit = (e) => {
    console.log({
      bank,
      accountNumber,
      accountName,
      customersNumber,
      narration,
      amount,
      phoneNumber,
    });
  }

  return (
    <div className={style.container}>
      {page === "bank" ? <BankForm
          handleBankChange={handleBankChange} 
          handleAccountNumberChange={handleAccountNumberChange}  
          handleAccountNameChange={handleAccountNameChange}  
          handleCustomersNumberChange={handleCustomersNumberChange}  
          handleNarrationChange={handleNarrationChange}  
          handleAmountChange={handleAmountChange}  
          handlePhoneNumberChange={handlePhoneNumberChange}  
          handleSetPage={handleSetPage} />
      : page === "summary" ? <PaymentSummary 
          handleSetPage={handleSetPage}
          phoneNumber={phoneNumber} 
          amount={amount} 
          total={total} 
          handleOnSubmit={handleOnSubmit} /> 
      : page === "success"? <SuccessfulTransaction /> 
      : <AmountForm 
          handleAmountChange={handleAmountChange}
          handlePhoneNumberChange={handlePhoneNumberChange}
          handleSetPage={handleSetPage}
        /> }
    </div>
  );
};

export default Withdraw;