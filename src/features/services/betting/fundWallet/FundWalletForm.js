import React, { useState } from "react";

import Form from "../../../../components/common/Form";
import FormGroup from "../../../../components/common/FormGroup";
import Input from "../../../../components/common/Input";
import Submit from "../../../../components/common/Button";

import validateFormData from "../../../../validation/validateFormData";
import logo from "../../../../assets/icons/cloudbet.jpg";

export const FundWalletForm = (props) => {
  const { setComponentToRender, dispatch, FundWalletFormState: state } = props;
  const [errors, setErrors] = useState({});

  const handleStateChange = ({ target }) => {
    delete errors[target.name];

    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  const handleOnContinue = (e) => {
    e.preventDefault();

    const { accountId, amount } = state;

    const validationState = {
      accountId,
      amount,
    };

    const properties = Object.keys(validationState);
    const errors = validateFormData(state, properties);

    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  return (
    <Form
      autoComplete="off"
      title="Fund Cloudbet Wallet"
      caption="Complete your payment information"
      handleOnSubmit={handleOnContinue}
      logo={logo}
    >
      <FormGroup>
        <Input
          name="accountId"
          label="Cloudbet ID"
          value={state.accountId}
          type="text"
          handleOnChange={handleStateChange}
          placeholder="e.g 08012345678"
          error={errors.accountId}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="amount"
          label="Amount"
          value={state.amount}
          type="number"
          placeholder="Enter amount"
          handleOnChange={handleStateChange}
          error={errors.amount}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="phone"
          label="Phone"
          type="text"
          value={state.phone}
          handleOnChange={handleStateChange}
          placeholder="e.g 08012345678"
          error={errors.phone}
        />
      </FormGroup>
      <Submit
        type="submit"
        disabled={!state.accountId || !state.amount || !state.phone}
      >
        Continue
      </Submit>
    </Form>
  );
};

export default FundWalletForm;
