import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Form from "../../../components/common/Form";
import FormGroup from "../../../components/common/FormGroup";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import Submit from "../../../components/common/Button";

import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";
import validateFormData from "../../../validation/validateFormData";
import {
  GET_CABLE_PLANS,
  VALIDATE_STARTIMES_CUSTOMER,
  VALIDATE_MULTICHOICE_CUSTOMER,
} from "../../../utils/constants";

export const RechargeCableForm = (props) => {
  const {
    RechargeCableFormState: state,
    setFormState,
    setComponentToRender,
  } = props;
  const [customerValidationLoading, setCustomerValidationLoading] = useState(
    false
  );
  const [fetchPlansLoading, setFetchPlansLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [plans, setPlans] = useState([]);

  //effect fetches plans based on selected provider
  useEffect(() => {
    let isCancelled;

    if (!isCancelled) {
      fetchDataPlans();
    }

    return () => {
      isCancelled = true;
    };
  }, [props.service]);

  useEffect(() => {
    let isCancelled;

    if (!isCancelled && state.cycle) {
      const selectedCycle = state.cycles.find((cycle) => {
        return cycle.name === state.cycle;
      });

      const amount = selectedCycle.amount;

      setFormState({
        type: "UPDATE_FORM_STATE",
        payload: { amount },
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [state.cycle]);

  useEffect(() => {
    let isCancelled;

    if (state.smartCardNumber && state.smartCardNumber.length >= 10) {
      (async function validateSmartCardNo() {
        const { smartCardNumber, amount } = state;

        setCustomerValidationLoading(true);

        let payload;
        let requestUrl;

        if (props.service === "startimes") {
          requestUrl = VALIDATE_STARTIMES_CUSTOMER;
          payload = {
            smartcard: smartCardNumber,
            amount,
          };
        } else if (props.service === "dstv" || props.service === "gotv") {
          requestUrl = VALIDATE_MULTICHOICE_CUSTOMER;
          payload = {
            smartcard: smartCardNumber,
            type: props.service,
            service: props.service === "startimes" ? "default" : "multichoice",
            amount,
          };
        }

        try {
          const res = await axios.post(requestUrl, payload);
          const customerName = res.data.data.name;

          if (!customerName) throw new Error();

          if (res && !isCancelled) {
            setFormState({
              type: "UPDATE_FORM_STATE",
              payload: { customerName },
            });

            setValidationErrors({
              ...validationErrors,
              customer_info: "",
            });
          }
        } catch (e) {
          setValidationErrors({
            ...validationErrors,
            customer_info: {
              text: "Customer validation failed",
            },
          });
        } finally {
          setCustomerValidationLoading(false);
        }
      })();
    }

    return () => {
      isCancelled = true;
    };
  }, [state.smartCardNumber]);

  //calculates and sets payable amount based on selectedPlanAmount and plan duration

  useEffect(() => {
    let isCancelled;

    if (
      state.selectedPlanCode &&
      (props.service === "dstv" || props.service === "gotv") &&
      !isCancelled
    ) {
      const selectedPlan = plans.find(
        (plan) => plan.product_code === state.selectedPlanCode
      );

      const amount = selectedPlan.amount;

      setFormState({
        type: "UPDATE_FORM_STATE",
        payload: { amount },
      });
    }

    if (
      state.selectedPlanCode &&
      props.service === "startimes" &&
      !isCancelled
    ) {
      const selectedPlan = plans.find(
        (plan) => plan.name === state.selectedPlanCode
      );

      let cycles = [];

      for (var key in selectedPlan.cycles) {
        if (selectedPlan.cycles.hasOwnProperty(key)) {
          cycles.push({ name: key, amount: selectedPlan.cycles[key] });
        }
      }

      setFormState({
        type: "UPDATE_FORM_STATE",
        payload: { cycles },
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [state.selectedPlanCode]);

  const fetchDataPlans = async () => {
    setFetchPlansLoading(true);

    let payload;

    if (props.service === "startimes") {
      payload = {
        type: "default",
        service: "startimes",
      };
    } else if (props.service === "dstv" || props.service === "gotv") {
      payload = {
        service: "multichoice",
        type: props.service,
      };
    }

    try {
      const res = await axios.post(GET_CABLE_PLANS, payload);

      const plans = res.data.data.bouquets;

      setPlans(plans);
    } catch (e) {
      // console.log(e);
    } finally {
      setFetchPlansLoading(false);
    }
  };

  const handleFormStateChange = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });
    setFormState({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  const handleOnContinue = (e) => {
    e.preventDefault();

    const { cycles, cycle, selectedPlanName, ...rest } = state;

    const keys = Object.keys({ ...rest });
    const errors = validateFormData(state, keys);

    setValidationErrors(errors);

    //restricting customer name error to failed validation
    delete errors.customerName;

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  //Dynamically render bank logo
  let providerImageUrl = generateServiceProviderImageUrl(props.service);

  return (
    <Form
      autoComplete="off"
      title="Recharge Cable TV"
      caption="Complete your payment information"
      handleOnSubmit={handleOnContinue}
      logo={providerImageUrl}
    >
      {/* <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={providerImageUrl}
          alt="cable provider icon"
        />
      </div> */}
      <FormGroup>
        <Select
          name="selectedPlanCode"
          label="Packages"
          value={state.selectedPlanCode}
          handleOnChange={handleFormStateChange}
          loading={fetchPlansLoading}
          error={validationErrors.selectedPlanCode}
        >
          <option value="">Select Plan</option>
          {plans.map((plan, index) => {
            return (
              <option
                value={plan.product_code || plan.name}
                key={`${index}--${plan.name}`}
              >
                {plan.name}
              </option>
            );
          })}
        </Select>
      </FormGroup>
      {props.service === "startimes" && (
        <FormGroup>
          <Select
            name="cycle"
            value={state.cycle}
            label="Plan duration"
            handleOnChange={handleFormStateChange}
            error={validationErrors.cycle}
          >
            <option value="">Select Duration</option>
            {state.cycles.map((plan, index) => {
              return (
                <option value={plan.name} key={`${index}--${plan.amount}`}>
                  {plan.name}
                </option>
              );
            })}
          </Select>
        </FormGroup>
      )}
      <FormGroup>
        <Input
          name="amount"
          label="Amount"
          placeholder="Enter amount"
          type="text"
          value={state.amount}
          error={validationErrors.amount}
          disabled
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="smartCardNumber"
          label="Smart Card Number"
          placeholder="Enter smart card number"
          value={state.smartCardNumbe}
          type="text"
          handleOnChange={handleFormStateChange}
          error={validationErrors.smartCardNumber}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="customerName"
          label="Customer name"
          placeholder="Customer's name"
          type="text"
          value={state.customerName}
          disabled={true}
          error={validationErrors.customerName}
          loading={customerValidationLoading}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="phone"
          label="Phone"
          placeholder="Enter phone number"
          type="text"
          value={state.phone}
          error={validationErrors.phone}
          handleOnChange={handleFormStateChange}
        />
      </FormGroup>
      <Submit type="submit">Submit</Submit>
    </Form>
  );
};

RechargeCableForm.propTypes = {
  RechargeCableFormState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default RechargeCableForm;
