import React from "react";
import Loader from "../../../partials/Loader";
import wallet from "../../../../assets/images/wallet.svg";
import styles from './FundWalletRequestForm.module.scss';

export const FundWalletRequestForm = ({handleAmountChange, setComponentToRender, setAccountName, setBank, setAccountNumber, tellerNumber, amount, setBankCode, handleTellerNumberChange, bankCode, loading}) => {
  const banks = [{"code":"100","id":18,"name":"Suntrust Bank","account": "0012345678"}, {"code":"044","id":1,"name":"Access Bank","account": "0012345678"},
  {"code":"070","id":6,"name":"Fidelity Bank","account": "0012345678"}];

  return (
    <form className={styles.form} onSubmit={() => {
      if (amount && bankCode && tellerNumber) {
        setComponentToRender("summary");
      }
    }} >
        <div className={styles.imageContainer}>
          <img src={wallet} className={styles.image} />
        </div>
        <div className={styles.inputContainer}>
          <label>
            <span>Amount</span>
            <input type="number" onChange={handleAmountChange} />      
          </label> 
          <label>
            <span>Bank</span>
            <select>
              <option>{bankCode === "044" ? "Access Bank" : bankCode === "100" ? "Suntrust Bank" : bankCode === "70" 
              ? "Fidelity Bank" : "" }</option>
            </select>
            <div>
              {banks.map(bank => {
                return <p onClick={() => {
                  setBankCode(bank.code);
                  setAccountName("CICOSERVE PAYMENTS");
                  setAccountNumber(bank.account);
                  setBank(bank.name);
                }}><span className={styles.spanOne}>{bank.name}</span><span className={styles.spanTwo}>{bank.account}</span><span className={styles.spanThree}>CicoServe Payment</span></p>
              })}
            </div>
            {/* <select onChange={handleBankCodeChange}>   
              <option value="">Select Bank</option>
              {banks.map(bank => {
                return <option value={bank.code} key={bank.code}>{bank.name}  0012345678 CicoServe Payment</option>
              })}
            </select> */}
          </label>
          <label>
            <span>Teller Number</span>
            <input type="text" onChange={handleTellerNumberChange} />
          </label>              
        </div>
        <button type="submit">{loading ? <Loader size="small" color="white" position="center" /> : "Submit" }</button>
    </form>
  )
};

export default FundWalletRequestForm;