import React, {useState} from "react";
import { connect } from "react-redux";
import AmountForm from "./AmountForm";
import BankForm from "./BankForm";
import PaymentSummary from "../../../shared/PaymentSummary";
import SuccessfulTransaction from "../../../shared/SuccessfulTransaction";
import style from './Transfer.module.scss';
import { setCurrentPage } from "../../../../actions/page";

const Transfer = ({ changeCurrentPage }) => {
  changeCurrentPage({
    heading: "Transfer Money",
    search: false
  });

  const [page, setPage] = useState("amount");
  const [beneficiaryBank, setBeneficiaryBank] = useState("Beneficiary Bank");
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [beneficiaryAccountName, setBeneficiaryAccountName] = useState("");
  const [customersNumber, setCustomersNumber] = useState("");
  const [narration, setNarration] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBeneficiaryBankChange = (bank) => {
    setBeneficiaryBank(bank);
  };

  const handleBeneficiaryAccountNumberChange = (accountNumber) => {
    setBeneficiaryAccountNumber(accountNumber);
  };

  const handleBeneficiaryAccountNameChange = (accountName) => {
    setBeneficiaryAccountName(accountName);
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
      beneficiaryBank,
      beneficiaryAccountNumber,
      beneficiaryAccountName,
      customersNumber,
      narration,
      amount,
      phoneNumber,
    });
  }

  return (
    <div className={style.container}>
      {page === "bank" ? <BankForm
          handleBeneficiaryBankChange={handleBeneficiaryBankChange} 
          handleBeneficiaryAccountNumberChange={handleBeneficiaryAccountNumberChange}  
          handleBeneficiaryAccountNameChange={handleBeneficiaryAccountNameChange}  
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

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
}
export default connect(undefined, mapDispatchToProps)(Transfer);