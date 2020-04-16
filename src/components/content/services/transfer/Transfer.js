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

const Transfer = ({ changeCurrentPage, transferSettings }) => {
  const [page, setPage] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [beneficiaryBankName, setBeneficiaryBankName] = useState("");
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [beneficiaryAccountName, setBeneficiaryAccountName] = useState("");
  const [narration, setNarration] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionCost, setTransactionCost] = useState("");
  const [total, setTotal] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successPayload, setSuccessPayload] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(undefined);

  useEffect(() => {
    if (bankCode) {
      const bank = banksList.find(bank => {
        return bank.code === bankCode
      });

      const bankName = bank.name;
      setBeneficiaryBankName(bankName);
    }
  }, [bankCode])

  useEffect(() => {
    const selectedSetting = transferSettings.find(setting => {
      if (amount >= 10001) {
        return setting.minimum === 10001;
      } else {
        return setting.maximum < 10001; 
      }
    });

    setTransactionCost(selectedSetting.transaction_cost);
    setTotal(amount + selectedSetting.transaction_cost);
  }, [amount])

  useEffect(() => {
    changeCurrentPage({
      heading: "Transfer Money",
      search: false
    });
  }, [changeCurrentPage]);

  const handleSetPage = (page) => {
    setPage(page);
  };

  const handleOnSubmit = () => {
    setLoading(true);
    // setErrorText("");

    const payload = {
      "first_name" : firstName,
      "last_name" : lastName,
      "phone_number" : phone,
      "account_number" : beneficiaryAccountNumber,
      "bank_code" : bankCode,
      "amount" : amount
    };

    axios.post(DISBURSE_FUNDS, payload)
      .then(res => {
        const successPayload = res.data.data.data.provider_response;
        const status = res.data.data.status;

        setSuccessPayload({ ...successPayload, status, transactionCost, total });
        setLoading(false);
        setTransactionStatus(true);
        setPage("status");
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          const errorMessage = err.response.data.message;
          // setErrorText(errorMessage);
          setLoading(false);  
          setTransactionStatus(false);
          setPage("status");
        } else {
          setTimeout(() => {
            setLoading(false);
            setTransactionStatus(false);
            setPage("status");
            // setErrorText('Transaction failed please try again later');
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
    setAmount(Number(amount));
    setPhone(phone);
    setNarration(narration);
  };

  return (
    <div className={styles.container}>
      {page === "summary" ? <TransferSummary 
          loading={loading}
          phone={phone} 
          amount={amount} 
          transactionCost={transactionCost}
          total={total} 
          errorText={errorText}
          accountNumber={beneficiaryAccountNumber}
          accountName={beneficiaryAccountName}
          bank={beneficiaryBankName}
          handleOnSubmit={handleOnSubmit} />
      : page === "status"? <TransferStatus
          successPayload={successPayload}
          transactionStatus={transactionStatus}
          amount={amount}
          transactionCost={transactionCost}
      /> 
      : <BankForm
      handleSetPage={handleSetPage}
      handleContinue={handleContinue} />}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

const mapStateToProps = state => {
  return {
    transferSettings: state.auth.transactionSettings.transfer
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);