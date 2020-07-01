import React, { useState } from "react";
import { connect } from "react-redux";
import style from "./BuyInsurance.module.scss";
import InsuranceType from "./InsuranceType";
import UploadPhoto from "./UploadPhoto";
import InsurancePurchaseForm from "./InsurancePurchaseForm";
// import SuccessfulTransaction from "../../../shared/SuccessfulTransaction";
// import PaymentSummary from "../../../shared/PaymentSummary";
import { setCurrentPage } from "../../../../actions/page";

export const BuyInsurance = ({ changeCurrentPage }) => {
  changeCurrentPage({
    heading: "Buy Insurance",
    search: false,
  });

  const [page, setPage] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plan, setPlan] = useState("");
  const [file, setFile] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");

  const handleOnSubmit = () => {
    console.log({
      name,
      plan,
      phoneNumber,
      amount,
      type,
      file,
      month,
      year,
    });
  };

  const handleSetFile = (file) => {
    setFile(file);
  };

  const handleSetType = (type) => {
    setType(type);
  };

  const handleSetPage = (page) => {
    setPage(page);
  };

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleMonthChange = (month) => {
    setMonth(month);
  };

  const handleYearChange = (year) => {
    setYear(year);
  };

  const handlePlanChange = (plan) => {
    setPlan(plan);
  };

  const handlePhoneNumberChange = (phone) => {
    setPhoneNumber(phone);
  };

  const handleAmountChange = (amount) => {
    setAmount(amount);

    const total = amount + 140;
    setTotal(total);
  };

  return (
    <div className={style.container}>
      {page === "upload" ? (
        <UploadPhoto
          handleSetFile={handleSetFile}
          handleSetPage={handleSetPage}
        />
      ) : page === "form" ? (
        <InsurancePurchaseForm
          handleAmountChange={handleAmountChange}
          handleMonthChange={handleMonthChange}
          handleYearChange={handleYearChange}
          handleNameChange={handleNameChange}
          handlePhoneNumberChange={handlePhoneNumberChange}
          handlePlanChange={handlePlanChange}
          handleSetPage={handleSetPage}
        />
      ) : (
        // : page === "summary" ? <PaymentSummary
        //   phoneNumber={phoneNumber}
        //   amount={amount}
        //   total={total}
        //   handleOnSubmit={handleOnSubmit}
        //   handleSetPage={handleSetPage}
        // />
        // : page === "success" ? <SuccessfulTransaction />
        <InsuranceType
          handleSetType={handleSetType}
          handleSetPage={handleSetPage}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(BuyInsurance);
