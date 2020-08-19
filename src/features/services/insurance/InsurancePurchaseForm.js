import React, { useState } from "react";
import { connect } from "react-redux";
import style from "./InsurancePurchaseForm.module.scss";
import { setCurrentPage } from "../../../actions/page";

const InsurancePurchaseForm = (props) => {
  props.changeCurrentPage({
    heading: "Buy Insurance",
    search: false,
    sub: "Personal Details",
  });

  const plans = ["Max", "Bigi", "Smallie", "Family", "Oga"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
  const [errors, setErrors] = useState({
    name: true,
    phoneNumber: true,
    plan: true,
    amount: true,
    month: true,
    year: true,
  });

  return (
    <div className={style.container}>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();

          let hasError = true;

          console.log(errors);

          //Validation checks if input field is empty
          for (let error in errors) {
            if (errors.hasOwnProperty(error)) {
              if (errors[error]) {
                hasError = true;
                break;
              } else {
                hasError = false;
              }
            }
          }

          console.log(hasError);

          if (!hasError) {
            props.handleSetPage("summary");
          }
        }}
      >
        <label>
          <span>Name</span>
          <input
            type="text"
            onChange={(e) => {
              const name = e.target.value;

              if (name.trim().length > 0) {
                props.handleNameChange(name);
                setErrors({ ...errors, name: false });
              }
            }}
          />
        </label>
        <label>
          <span>Phone Number</span>
          <input
            type="text"
            onChange={(e) => {
              const phoneNumber = e.target.value;

              if (phoneNumber.trim().length > 0) {
                props.handlePhoneNumberChange(phoneNumber);
                setErrors({ ...errors, phoneNumber: false });
              }
            }}
          />
        </label>
        <label>
          <span>Plan</span>
          <select
            onChange={(e) => {
              const plan = e.target.value;

              if (plan.trim().length > 0) {
                props.handlePlanChange(plan);
                setErrors({ ...errors, plan: false });
              }
            }}
          >
            <option value="">Select Plan</option>
            {plans.map((plan, index) => {
              return (
                <option value={plan} key={index}>
                  {plan}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          <span>Amount</span>
          <input
            type="text"
            onChange={(e) => {
              const amount = e.target.value;

              if (amount.trim().length > 0) {
                props.handleAmountChange(amount);
                setErrors({ ...errors, amount: false });
              }
            }}
          />
        </label>
        <div>
          <label>
            <span>Month</span>
            <select
              onChange={(e) => {
                const month = e.target.value;

                if (month.trim().length > 0) {
                  props.handleMonthChange(month);
                  setErrors({ ...errors, month: false });
                }
              }}
            >
              <option value="">Select Month</option>
              {months.map((month, index) => {
                return (
                  <option value={month} key={index}>
                    {month}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <span>Year</span>
            <select
              onChange={(e) => {
                const year = e.target.value;

                if (year.trim().length > 0) {
                  props.handleYearChange(year);
                  setErrors({ ...errors, year: false });
                }
              }}
            >
              <option value="">Select Year</option>
              {years.map((year, index) => {
                return (
                  <option value={year} key={index}>
                    {year}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(InsurancePurchaseForm);
