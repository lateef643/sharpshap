import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

import Form from "../../../components/common/Form";
import FormGroup from "../../../components/common/FormGroup";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import Submit from "../../../components/common/Button";

import validateFormData from "../../../validation/validateFormData";
import { LOAN_APPLICATION } from "../../../utils/constants";

import logo from "../../../assets/images/cico-logo.svg";

export const AgentLoan = ({ agentUuid }) => {
  const [validationErrors, setValidationErrors] = useState({ errors: true });
  const [formState, setFormState] = useState({ loanAmount: "", duration: "" });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const handleOnChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const keys = Object.keys(formState);
    const errors = validateFormData(formState, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    requestLoan();
  };

  const requestLoan = () => {
    setLoading(true);

    (async function request() {
      const { loanAmount: amount, duration } = formState;

      const payload = { amount, duration, identifier: agentUuid };

      try {
        const res = await axios.post(LOAN_APPLICATION, payload);

        // setComponentToRender("status")

        addToast("Loan application was successful", {
          appearance: "error",
          autoDismiss: true,
        });
      } catch (e) {
        const message =
          e.response.data?.errors[0] || "Loan application was unsuccessful";

        addToast(message, {
          appearance: "error",
          autoDismiss: true,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <Form
      autoComplete="off"
      title="Funds Transfer"
      caption="Complete your payment information"
      handleOnSubmit={handleOnSubmit}
      logo={logo}
    >
      <FormGroup>
        <Input
          name="loanAmount"
          label="Amount"
          placeholder="Enter amount"
          type="text"
          value={formState.loanAmount}
          handleOnChange={handleOnChange}
          error={validationErrors.loanAmount}
        />
      </FormGroup>
      <FormGroup>
        <Select
          name="duration"
          label="Duration"
          type=""
          value={formState.duration}
          handleOnChange={handleOnChange}
          error={validationErrors.duration}
        >
          <option value="">Select duration</option>
          <option value="1">1 month</option>
        </Select>
      </FormGroup>
      <Submit type="submit">{loading ? <ThreeDots /> : "Submit"}</Submit>
    </Form>
  );
};

AgentLoan.propTypes = {
  AgentLoanState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
    agentUuid: state.auth.user.uuid,
  };
};

export default connect(mapStateToProps)(AgentLoan);
