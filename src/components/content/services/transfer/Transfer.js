import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import axios from "axios";
import BankForm from "./BankForm";
import PaymentSummary from "../../../shared/PaymentSummary";
import SuccessfulTransaction from "../../../shared/SuccessfulTransaction";
import style from './Transfer.module.scss';
import { setCurrentPage } from "../../../../actions/page";
import { DISBURSE_FUNDS } from "../../../../store/api/constants";

const Transfer = ({ changeCurrentPage }) => {
  const [page, setPage] = useState("amount");
  const [bankCode, setBankCode] = useState("");
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [beneficiaryAccountName, setBeneficiaryAccountName] = useState("");
  const [narration, setNarration] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

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
        console.log(res);
        setLoading(false);
        setPage("success");
      })
      .catch(err => {
        if (err.response && err.reponse.status === 403) {
          const errorMessage = err.response.data.data.message;
          setLoading(errorMessage);
          setLoading(false);      
        } else {
          setTimeout(() => {
            setLoading(false)
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
    setAmount(amount);
    setPhone(phone);
    setNarration(narration);
    setTotal(amount);
  };

  return (
    <div className={style.container}>
      {page === "summary" ? <PaymentSummary 
          loading={loading}
          phone={phone} 
          amount={amount} 
          total={total} 
          accountNumber={beneficiaryAccountNumber}
          handleOnSubmit={handleOnSubmit} /> 
      : page === "success"? <SuccessfulTransaction /> 
      : <BankForm
      handleSetPage={handleSetPage}
      handleContinue={handleContinue} />}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
}
export default connect(undefined, mapDispatchToProps)(Transfer);