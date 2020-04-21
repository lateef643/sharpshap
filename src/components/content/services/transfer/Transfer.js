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
  const [page, setPage] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [beneficiaryBankName, setBeneficiaryBankName] = useState("");
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [beneficiaryAccountName, setBeneficiaryAccountName] = useState("");
  const [narration, setNarration] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(undefined);

  useEffect(() => {
    if (bankCode) {
      const bank = banksList.find(bank => {
        return bank.code === bankCode
      });

      const bankName = bank.name;
      setBeneficiaryBankName(bankName);
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

  const handleSetPage = (page) => {
    setPage(page);
  };

  const handleOnSubmit = () => {
    setLoading(true);

    const payload = {
      "first_name" : firstName,
      "last_name" : lastName,
      "phone_number" : phone,
      "account_number" : beneficiaryAccountNumber,
      "bank_code" : bankCode,
      "amount" : String(amount)
    };

    axios.post(DISBURSE_FUNDS, payload)
      .then(res => {
        const successData = res.data.data.data.provider_response;
        const status = res.data.data.status;
        const date = new Date();
        const transactionDate = getTransactionDate(date);

        setSuccessData({ ...successData, status, transactionCost: TRANSACTION_COST, total, date: transactionDate, bank: beneficiaryBankName });
        setLoading(false);
        setTransactionStatus(true);
        setPage("status");
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          const errorMessage = err.response.data.message;
          setLoading(false);  
          setTransactionStatus(false);
          setPage("status");
        } else {
          setTimeout(() => {
            setLoading(false);
            setTransactionStatus(false);
            setPage("status");
          }, 7000);
        }
      })
  };

  const handleContinue = ({ bankCode, accountName, accountNumber, firstName, lastName,
    amount, phone, narration}) => {
    setBankCode(bankCode);
    setBeneficiaryAccountName(accountName);
    setBeneficiaryAccountNumber(accountNumber);
    setFirstName(firstName);
    setLastName(lastName);    
    setAmount(parseInt(amount));
    setPhone(phone);
    setNarration(narration);
    setTotal(amount + TRANSACTION_COST);
  };

  switch(page) {
    case("summary"):
      renderedComponent = 
      <TransferSummary 
        loading={loading}
        phone={phone} 
        amount={amount} 
        transactionCost={TRANSACTION_COST}
        total={total} 
        accountNumber={beneficiaryAccountNumber}
        accountName={beneficiaryAccountName}
        bank={beneficiaryBankName}
        handleOnSubmit={handleOnSubmit} />;
      break;

    case("status"):
      renderedComponent = 
      <TransferStatus
        successData={successData}
        transactionStatus={transactionStatus}
        amount={amount}
        total={total} 
        transactionCost={TRANSACTION_COST} />;
      break;

    default: 
      renderedComponent = 
      <BankForm
        handleSetPage={handleSetPage}
        handleContinue={handleContinue} 
        />;
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