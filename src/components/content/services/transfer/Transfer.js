import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import axios from "axios";
import BankForm from "./BankForm";
import banksList from "../../../../store/localData/listOfBanks";
import TransferSummary from "./TransferSummary";
import TransferStatus from "./TransferStatus";
import { setCurrentPage } from "../../../../actions/page";
import { DISBURSE_FUNDS } from "../../../../store/api/constants";
import styles from './Transfer.module.scss';

const Transfer = ({ changeCurrentPage }) => {
  let renderedComponent;
  const TRANSACTION_COST = 35;
  const [componentToRender, setComponentToRender] = useState("form");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [narration, setNarration] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [firstName, setFirstName] = useState("");
  const [accountValidationErrorText, setAccountValidationErrorText] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(undefined);

  useEffect(() => {
    if (bankCode) {
      const bank = banksList.find(bank => {
        return bank.code === bankCode
      });

      const bankName = bank.name;
      setBankName(bankName);
    }
  }, [bankCode]);

  useEffect(() => {
    changeCurrentPage({
      heading: "Transfer Money",
      search: false
    });
  }, [changeCurrentPage]);

  const getTransactionDate = (date) => {
    const dateString = date.toString();
    const index = dateString.search("GMT");
    return dateString.slice(0, 24);
  };

  const handleOnSubmit = () => {
    setLoading(true);

    const payload = {
      "first_name" : firstName,
      "last_name" : lastName,
      "phone_number" : phone,
      "account_number" : accountNumber,
      "bank_code" : bankCode,
      "amount" : String(amount)
    };

    axios.post(DISBURSE_FUNDS, payload)
      .then(res => {
        const successData = res.data.data.data.provider_response;
        const status = res.data.data.status;
        const date = new Date();
        const transactionDate = getTransactionDate(date);

        setSuccessData({ ...successData, status, transactionCost: TRANSACTION_COST, total, date: transactionDate, bank: bankName });
        setLoading(false);
        setTransactionStatus(true);
        setComponentToRender("status");
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          setLoading(false);  
          setTransactionStatus(false);
          setComponentToRender("status");
        } else {
          setTimeout(() => {
            setLoading(false);
            setTransactionStatus(false);
            setComponentToRender("status");
          }, 7000);
        }
      })
  };

  const handleBankCodeChange = (e) => {
    const bankCode = e.target.value;
    setBankCode(bankCode);
  }
    
  const handleAmountChange = (e) => {
    const amount = Number(e.target.value);
    setAmount(amount);
    setTotal(amount + TRANSACTION_COST);
  };

  const handleAccountNumberChange = (e) => {
    const accountNumber = e.target.value;
    setAccountNumber(accountNumber);

    if (accountNumber.length >= 10) {
      setVerificationLoading(true);
    }
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const handleNarrationChange = (e) => {
    const narration = e.target.value;
    setNarration(narration)
  };

  switch(componentToRender) {
    case ("form"):
      renderedComponent = <BankForm
        handleBankCodeChange={handleBankCodeChange}
        handleAmountChange={handleAmountChange}
        handleAccountNumberChange={handleAccountNumberChange}
        handlePhoneChange={handlePhoneChange}
        handleNarrationChange={handleNarrationChange}
        bankCode={bankCode}
        accountNumber={accountNumber}
        accountName={accountName}
        setAccountName={setAccountName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        amount={amount}
        phone={phone}
        narration={narration}
        accountValidationErrorText={accountValidationErrorText}
        setAccountValidationErrorText={setAccountValidationErrorText}
        verificationLoading={verificationLoading}
        setVerificationLoading={setVerificationLoading}
        setComponentToRender={setComponentToRender}
      />;
      break;
    case("summary"):
      renderedComponent = <TransferSummary 
        loading={loading}
        phone={phone} 
        amount={amount} 
        transactionCost={TRANSACTION_COST}
        total={total} 
        accountNumber={accountNumber}
        accountName={accountName}
        bank={bankName}
        handleOnSubmit={handleOnSubmit} 
      />;
      break;
    case("status"):
      renderedComponent = <TransferStatus
        successData={successData}
        transactionStatus={transactionStatus}
        amount={amount}
        total={total} 
        transactionCost={TRANSACTION_COST} 
        setComponentToRender={setComponentToRender}
      />;
      break;
    default: 
      renderedComponent = null;
      break;
  }

  return (
    <div className={styles.container}>
      {renderedComponent}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(Transfer);