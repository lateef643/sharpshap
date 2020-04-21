import React, { useEffect, useState } from "react";
import axios from "axios";
import banksList from "../../../../store/localData/listOfBanks";
import { VERIFY_ACCOUNT } from "../../../../store/api/constants";
import VerificationLoader from "../../../partials/VerificationLoader";
import access from "../../../../assets/images/accessbank.png";
import fidelity from "../../../../assets/images/fidelitybank.svg";
import zenith from "../../../../assets/images/zenith-bank-logo.svg";
import gtbank from "../../../../assets/images/gtbank.svg";
import unity from "../../../../assets/images/unity.svg";
import wema from "../../../../assets/images/wema.svg";
import ecobank from "../../../../assets/images/ecobank.svg";
import scbank from "../../../../assets/images/schatered.svg";
import uba from "../../../../assets/images/uba.svg";
import heritage from "../../../../assets/images/heritage.svg";
import keystone from "../../../../assets/images/keystone.svg";
import fcmb from "../../../../assets/images/fcmb.svg";
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

  bankImageUrl = bankCode === "044" ? access 
  : bankCode === "058" ?  gtbank : bankCode === "033" ? uba
  : bankCode === "070" ? fidelity : bankCode === "215" ? unity 
  : bankCode === "057" ? zenith : bankCode === "214" ? fcmb 
  : bankCode === "035" ? wema : bankCode === "030" ? heritage
  : bankCode === "068" ? scbank : bankCode === "050" ? ecobank
  : bankCode === "082" ? keystone : access;

  return (
  <div className={styles.container}>
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault();

      const formData = {
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
        props.handleContinue(formData);
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
            return <option key={`${index}-${bank.code}`} value={bank.code}>{bank.name}</option>
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
      <button type="submit" disabled={!inputValidation}>Continue</button>
    </form> 
  </div>
)}

export default WithdrawForm;