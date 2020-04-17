import React, { useEffect, useState } from "react";
import axios from "axios";
import banksList from "../../../../store/localData/listOfBanks";
import { VERIFY_ACCOUNT } from "../../../../store/api/constants";
import { DISBURSE_FUNDS } from "../../../../store/api/constants";
import Loader from "../../../partials/Loader";
import VerificationLoader from "../../../partials/VerificationLoader";
import Access from "../../../../assets/images/download (10).png";
import UBA from "../../../../assets/images/uba_0.svg"
import Fidelity from "../../../../assets/images/cea20b8d-new-fidelity-bank-logo.svg";
import FirstBank from "../../../../assets/images/206-2069035_firstbank-logos-first-bank-of-nigeria-logo-1.svg";
import Union from "../../../../assets/images/ng-ubn-logo.svg";
import Zenith from "../../../../assets/images/zenith-bank-logo.svg";
import GTBank from "../../../../assets/images/gtbank_rwanda_logo.svg";
import bankIcon from "../../../../assets/images/money-svgrepo-com (1).svg";
import styles from './BankForm.module.scss';

const WithdrawForm = (props) => {
  const banks = banksList;
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [narration, setNarration] = useState("");
  const [accountValidationErrorText, setAccountValidationErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);

  const inputValidation = bankCode && accountNumber && accountName && amount && phone && narration;

  useEffect(() => {
    const payload = {
      "account_number" : accountNumber,
      "bank_code" : bankCode,
      "amount": amount || 0
    };

    if (accountNumber.length >= 10) {
      axios.post(VERIFY_ACCOUNT, payload)
        .then(res => {
          const accountName = res.data.data.data.account_info.accountName;
          const firstName = res.data.data.data.account_info.firstName;
          const lastName = res.data.data.data.account_info.lastName;
          setAccountName(accountName);
          setFirstName(firstName);
          setLastName(lastName);
          setAccountValidationErrorText("");
          setVerificationLoading(false)
        })
        .catch(err => {
          setAccountName("");
          setAccountValidationErrorText("Account verification failed please check account number and try again");
          setVerificationLoading(false)
        })      
    } else {
      setAccountName("");
    }

  }, [accountNumber]);

  //Dynamically render bank logo
  let bankImageUrl = "";

  bankImageUrl = bankCode === "044" ? Access : bankCode === "058" ?  GTBank
  : bankCode === "011" ? FirstBank : bankCode === "033" ? UBA 
  : bankCode === "070" ? Fidelity : bankCode === "032" ? Union
  : bankCode === "057" ? Zenith : Access;

  return (
  <div className={styles.container}>
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault();

      const payload = {
        bankCode,
        accountName,
        accountNumber,
        firstName,
        lastName,
        amount,
        phone,
        narration
      };

      if (inputValidation) {
        props.handleContinue(payload);
        props.handleSetPage("summary");      
      }
    }} >

    <div className={styles.imageContainer}>
      <img className={styles.image} src={bankImageUrl} alt="bank logo" />
    </div>
    <div className={styles.inputContainer}>
      <label>
        <span>Beneficiary Bank</span>
        <select onChange={(e) =>{
          const bankName = e.target.value;
          setBankCode(bankName);
        }}>
          <option value="Beneficiary Bank">Select Bank</option>
          {banks.map((bank, index) => {
            return <option key={index} value={bank.code}>{bank.name}</option>
          })}
        </select>
      </label>
      <label>
        <span>Amount</span>
        <input type="number" onChange={(e) => {
          const amount = Number(e.target.value);
          setAmount(amount);
        }} />      
      </label>
      <label>
        <span>Beneficiary Account Number</span>
        <input type="text" onChange={(e) => {
          const accountNumber = e.target.value;
          setAccountNumber(accountNumber);

          if (accountNumber.length >= 10) {
            setVerificationLoading(true);
          }
        }} />      
      </label>
      <label>
        <span>Beneficiary Account Name</span>
        <input type="text" value={accountName} className={verificationLoading ? styles.transparent : styles.opaque}
        disabled={true} />
        {verificationLoading ? <VerificationLoader /> : undefined}
        {accountValidationErrorText ? <p className={styles.validationErrorText}>{accountValidationErrorText}</p> : undefined}
            
      </label>
      <label>
        <span>Customer's Number</span>
        <input type="text" onChange={(e) => {
          const phone = e.target.value;
          setPhone(phone)
        }} />      
      </label>    
      <label>
        <span>Narration</span>
        <input type="text" onChange={(e) => {
          const narration = e.target.value;
          setNarration(narration)
        }} />      
      </label> 
      </div>   
      <button type="submit" disabled={!inputValidation}>{loading ? <Loader size="small" color="white" /> :"Continue"}</button>
    </form> 
  </div>
)}

export default WithdrawForm;