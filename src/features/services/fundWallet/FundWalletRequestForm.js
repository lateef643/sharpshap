import React from "react";
import { ThreeDots } from "svg-loaders-react";
import wallet from "../../../assets/images/wallet.svg";
import styles from "./FundWalletRequestForm.module.scss";

export const FundWalletRequestForm = ({
  handleAmountChange,
  bank,
  setComponentToRender,
  setAccountName,
  setBank,
  setAccountNumber,
  tellerNumber,
  amount,
  setBankCode,
  handleTellerNumberChange,
  bankCode,
  loading,
}) => {
  const banks = [
    { code: "100", id: 18, name: "Suntrust Bank", account: "0001192798" },
    { code: "044", id: 1, name: "Access Bank", account: "0012345678" },
    { code: "070", id: 6, name: "Fidelity Bank", account: "0012345678" },
  ];

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={() => {
        if (amount && bankCode && tellerNumber) {
          setComponentToRender("summary");
        }
      }}
    >
      <div className={styles.formGroup}>
        <label className={styles.label}>Amount</label>
        <input
          type="number"
          onChange={handleAmountChange}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Bank</label>
        <select className={styles.select}>
          <option>{bank}</option>
        </select>
        {/* <div>
          {banks.map((bank) => {
            return (
              <p
                onClick={() => {
                  setBankCode(bank.code);
                  setAccountName("CICOSERVE PAYMENTS");
                  setAccountNumber(bank.account);
                  setBank(bank.name);
                }}
              >
                <span className={styles.spanOne}>{bank.name}</span>
                <span className={styles.spanTwo}>{bank.account}</span>
                <span className={styles.spanThree}>CicoServe Payment</span>
              </p>
            );
          })}
        </div> */}
        {/* <select onChange={handleBankCodeChange}>   
            <option value="">Select Bank</option>
            {banks.map(bank => {
              return <option value={bank.code} key={bank.code}>{bank.name}  0012345678 CicoServe Payment</option>
            })}
          </select> */}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Teller Number</label>
        <input
          type="text"
          onChange={handleTellerNumberChange}
          className={styles.select}
        />
      </div>
      <button type="submit" className={styles.button}>
        {loading ? <ThreeDots /> : "Submit"}
      </button>
    </form>
  );
};

export default FundWalletRequestForm;
