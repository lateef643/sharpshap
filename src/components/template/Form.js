import React, { useState } from "react";

import banks from "../../../utils/listOfBanks";
import validateFormData from "../../../validation/validateFormData";

import Form from "../../../components/common/Form";
import FormGroup from "../../../components/common/FormGroup";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import Submit from "../../../components/common/Button";

import styles from "./Form.module.scss";

const TransferForm = ({ formState, setFormState, setComponentToRender }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { accountName, ...rest } = formState;

    const keys = Object.keys({ ...rest });
    const errors = validateFormData({ ...rest }, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  const handleOnChange = ({ target }) => {
    setFormState({ ...setFormState, [target.name]: target.amount });
  };
  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleOnSubmit}
        title="Payment information"
        caption="Complete your payment information"
      >
        <FormGroup>
          <Input
            name="amount"
            value={formState.amount}
            type="text"
            label="Amount"
            onChange={handleOnChange}
            placeholder="Enter amount"
            error={validationErrors.amount}
          />
        </FormGroup>
        <FormGroup>
          <Select
            name="bankName"
            value={formState.bankName}
            type="text"
            label="Beneficiary bank"
            onChange={handleOnChange}
            placeholder="e.g 0011001100"
            error={validationErrors.bankName}
          >
            <option value="">Select Bank</option>
            {banks.map((bank, index) => {
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
            value={formState.accountNumber}
            type="text"
            label="Account number"
            onChange={handleOnChange}
            placeholder="Enter account number"
            error={validationErrors.accountNumber}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="accountName"
            value={formState.accountName}
            type="text"
            label="Account name"
            onChange={handleOnChange}
            placeholder="Enter account number"
            error={validationErrors.accountName}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="phone"
            value={formState.phone}
            type="text"
            label="Phone"
            onChange={handleOnChange}
            placeholder="e.g 08012345678"
            error={validationErrors.phone}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="narration"
            value={formState.narration}
            type="text"
            label="Narration"
            onChange={handleOnChange}
            placeholder="e.g 08012345678"
            error={validationErrors.narration}
            tooltip="A brief note describing your transaction"
          />
        </FormGroup>
        <Submit type="submit">Submit</Submit>
      </Form>
    </div>
  );
};

export default TransferForm;
