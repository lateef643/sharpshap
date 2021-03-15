import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Form from "../../../components/common/Form";
import FormGroup from "../../../components/common/FormGroup";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import Submit from "../../../components/common/Button";

import { VERIFY_ACCOUNT } from "../../../utils/constants";
import generateBankImageUrl from "./generateBankImageUrl";
import validateFormData from "../../../validation/validateFormData";
import banksList from "../../../utils/listOfBanks";

import styles from "./FundsTransferForm.module.scss";

export const FundsTransferForm = (props) => {
  const {
    FundsTransferFormState: state,
    dispatch,
    setComponentToRender,
    transactionCost,
  } = props;
  const [accountValidationLoading, setAccountValidationLoading] = useState(
    false
  );
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const { accountNumber, beneficiaryBankCode } = state;

    const payload = {
      account_number: accountNumber,
      bank: beneficiaryBankCode,
    };

    if (accountNumber.length >= 10) {
      setValidationErrors({ ...validationErrors, accountName: "" });
      setAccountValidationLoading(true);

      (async function verifyAccount() {
        try {
          const res = await axios.post(VERIFY_ACCOUNT, payload);

          const accountName = res.data.data.Data.name;

          if (accountName == "ERROR") throw new Error();

          dispatch({
            type: "UPDATE_FORM_STATE",
            payload: { accountName },
          });
          setValidationErrors({ ...validationErrors, accountName: false });
          setAccountValidationLoading(false);
        } catch (e) {
          dispatch({
            type: "UPDATE_FORM_STATE",
            payload: { accountName: "" },
          });
          setValidationErrors({ ...validationErrors, accountName: true });
          setAccountValidationLoading(false);
        }
      })();
    } else {
      dispatch({
        type: "UPDATE_FORM_STATE",
        payload: { accountName: "" },
      });
    }
  }, [state.accountNumber]);

  //update total on amount change
  useEffect(() => {
    if (!isNaN(parseInt(state.amount))) {
      const total = parseInt(state.amount) + transactionCost;

      dispatch({
        type: "UPDATE_FORM_STATE",
        payload: { total },
      });
    }
  }, [state.amount]);

  //update bank name on bank code change
  useEffect(() => {
    if (state.beneficiaryBankCode) {
      const selectedBank = banksList.find((bank) => {
        return bank.code == state.beneficiaryBankCode;
      });

      const bankName = selectedBank.name;

      dispatch({
        type: "UPDATE_FORM_STATE",
        payload: { beneficiaryBankName: bankName },
      });
    }
  }, [state.beneficiaryBankCode]);

  const handleOnContinue = (e) => {
    e.preventDefault();

    const keys = Object.keys(state);
    const errors = validateFormData(state, keys);

    setValidationErrors(errors);

    //want account validation error to only show on failed validation
    delete errors.accountName;

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  const handleFormStateChange = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });
    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  //Dynamically render bank logo
  let bankImageUrl = generateBankImageUrl(state.beneficiaryBankCode);

  return (
    <Form
      autoComplete="off"
      title="Funds Transfer"
      caption="Complete your payment information"
      handleOnSubmit={handleOnContinue}
      logo={bankImageUrl}
    >
      <FormGroup>
        <Input
          name="amount"
          value={state.amount}
          type="number"
          label="Amount"
          placeholder="Enter amount"
          handleOnChange={handleFormStateChange}
          error={validationErrors.amount}
        />
      </FormGroup>
      <FormGroup>
        <Select
          name="beneficiaryBankCode"
          label="Beneficiary's bank"
          handleOnChange={handleFormStateChange}
        >
          <option value="">Select Bank</option>
          {banksList.map((bank, index) => {
            return (
              <option value={bank.code} key={`${index}--${bank.name}`}>
                {bank.name}
              </option>
            );
          })}
        </Select>
      </FormGroup>
      <FormGroup>
        <Input
          name="accountNumber"
          placeholder="Beneficiary's account number"
          value={state.accountNumber}
          type="text"
          label="Account number"
          error={validationErrors.accountNumber}
          handleOnChange={handleFormStateChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="accountName"
          type="text"
          label="Account name"
          value={state.accountName}
          disabled={true}
          loading={accountValidationLoading}
          error={validationErrors.accountName}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="phone"
          type="text"
          label="Phone"
          value={state.phone}
          handleOnChange={handleFormStateChange}
          placeholder="e.g 08012345678"
          error={validationErrors.phone}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="narration"
          label="Narration"
          type="text"
          value={state.narration}
          placeholder="Remark (e.g Transfer funds to John Doe)"
          handleOnChange={handleFormStateChange}
        />
      </FormGroup>
      <Submit
        type="submit"
        className={styles.button}
        disabled={
          !state.beneficiaryBankCode ||
          !state.beneficiaryBankName ||
          !state.amount ||
          !state.accountNumber ||
          !state.accountName ||
          !state.phone ||
          !state.narration ||
          !state.total
        }
      >
        Continue
      </Submit>
    </Form>
  );
};

FundsTransferForm.propTypes = {
  FundsTransferFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default FundsTransferForm;
