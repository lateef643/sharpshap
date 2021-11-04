import React, { useState } from "react";
import PropTypes from "prop-types";

import generateServiceImageUrl from "./generateNetworkImageUrl";

import Form from "../../../components/common/Form";
import FormGroup from "../../../components/common/FormGroup";
import Input from "../../../components/common/Input";
import Submit from "../../../components/common/Button";

import validateFormData from "../../../validation/validateFormData";

export const BuyAirtimeForm = (props) => {
  const {
    AirtimePurchaseFormState: state,
    dispatch,
    service,
    setComponentToRender,
  } = props;
  const [validationErrors, setValidationErrors] = useState({});

  const handleOnContinue = (e) => {
    e.preventDefault();

    const keys = Object.keys(state);
    const errors = validateFormData(state, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  const handleSetFormState = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });

    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  //Dynamically render bank logo
  let networkImageUrl = generateServiceImageUrl(service);

  return (
    <Form
      autoComplete="off"
      title="Buy Airtime"
      caption="Complete your payment information"
      handleOnSubmit={handleOnContinue}
      logo={networkImageUrl}
    >
      <FormGroup>
        <Input
          name="phone"
          placeholder="e.g 08012345678"
          label="Phone Number"
          value={state.phone}
          type="text"
          handleOnChange={(e) => handleSetFormState(e)}
          error={validationErrors.phone}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="amount"
          value={state.amount}
          label="Amount"
          type="number"
          error={validationErrors.amount}
          handleOnChange={(e) => handleSetFormState(e)}
        />
      </FormGroup>
      <Submit type="submit">Continue</Submit>
    </Form>
  );
};

BuyAirtimeForm.propTypes = {
  networkList: PropTypes.array.isRequired,
  AirtimePurchaseFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default BuyAirtimeForm;
