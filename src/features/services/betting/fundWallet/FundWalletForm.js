import React, { useState, useEffect } from "react";
import axios from "axios";

import Form from "../../../../components/common/Form";
import FormGroup from "../../../../components/common/FormGroup";
import Input from "../../../../components/common/Input";
import Submit from "../../../../components/common/Button";

import { LOOKUP_ACCOUNT } from "../../../../utils/constants";
import validateFormData from "../../../../validation/validateFormData";
import generateProviderImageUrl from "../generateProviderImageUrl";

export const FundWalletForm = ({
  setComponentToRender,
  dispatch,
  FundWalletFormState: state,
  service,
}) => {
  const [errors, setErrors] = useState({});
  const [accountIdLoading, setAccountIdLoading] = useState(false);

  useEffect(() => {
    let isCancelled;

    if (!isCancelled && service !== "cloudbet" && state.accountId.length >= 5) {
      setAccountIdLoading(true);
      const { accountId } = state;

      const payload = {
        provider: service.toUpperCase(),
        customer_id: accountId,
      };

      (async function lookupAccountId() {
        try {
          const res = await axios.post(LOOKUP_ACCOUNT, payload);

          const { user_name } = res.data.data;

          delete errors.accountName;

          dispatch({
            type: "UPDATE_FORM_STATE",
            payload: { accountName: user_name },
          });
        } catch (e) {
          setErrors({
            ...errors,
            accountName: {
              error: true,
              text: "Account validation failed",
            },
          });
        } finally {
          setAccountIdLoading(false);
        }
      })();
    }
    return () => {
      isCancelled = true;
    };
  }, [state.accountId]);

  const handleStateChange = ({ target }) => {
    if (target.name === "accountId") delete errors["accountName"];

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

  const logo = generateProviderImageUrl(service);

  return (
    <Form
      autoComplete="off"
      title={`Fund ${service} Wallet`}
      caption="Complete your payment information"
      handleOnSubmit={handleOnContinue}
      logo={logo}
    >
      <FormGroup>
        <Input
          name="accountId"
          label={`${service} ID`}
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
          name="accountName"
          label="Username"
          value={state.accountName}
          type="text"
          placeholder="Username"
          handleOnChange={handleStateChange}
          error={errors.accountName}
          loading={accountIdLoading}
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
