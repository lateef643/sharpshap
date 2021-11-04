import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";

import Form from "../../../components/common/Form";
import FormGroup from "../../../components/common/FormGroup";
import Select from "../../../components/common/Select";
import Input from "../../../components/common/Input";
import Submit from "../../../components/common/Button";

import {
  // GET_ENERGY_VENDORS,
  VALIDATE_METER_NUMBER,
} from "../../../utils/constants";
import validateFormData from "../../../validation/validateFormData";

import styles from "./ElectricityPaymentForm.module.scss";

const ElectricityPaymentForm = (props) => {
  const {
    ElectricityPaymentFormState: state,
    setState,
    setComponentToRender,
  } = props;
  // const [energyVendors, setEnergyVendors] = useState([]);
  // const [accountName, setAccountName] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  let serviceImageUrl = generateServiceProviderImageUrl(props.service);

  // useEffect(() => {
  //   (async function fetchVendorsList() {
  //     const res = await axios.get(GET_ENERGY_VENDORS);
  //     const energyVendors = res.data.data;

  //     setEnergyVendors(energyVendors);
  //   })();
  // }, []);

  // useEffect(() => {
  //   let isCancelled;

  //   if (energyVendors) {
  //     const selectedEnergyVendor = energyVendors.find((vendor) => {
  //       return vendor.name === props.service.toUpperCase();
  //     });

  //     if (selectedEnergyVendor) {
  //       const selectedVendorCode = selectedEnergyVendor.name.trim();

  //       setState({
  //         type: "UPDATE_FORM_STATE",
  //         payload: { disco: selectedVendorCode },
  //       });
  //     }
  //   }

  //   return () => {
  //     isCancelled = true;
  //   };
  // }, [energyVendors]);

  useEffect(() => {
    const { meterNo, paymentPlan, amount } = state;
    const req = {
      meter_number: meterNo,
      disco: props.service,
      type: paymentPlan,
      amount,
    };

    if (!isNaN(parseInt(meterNo)) && meterNo.length >= 10) {
      setLoading(true);

      setState({
        type: "UPDATE_FORM_STATE",
        payload: { accountName: "" },
      });

      setValidationErrors({ ...validationErrors, accountName: "" });

      (async function validateMeterNumber() {
        try {
          const res = await axios.post(VALIDATE_METER_NUMBER, req);

          const customerName = res.data.data.name;

          setLoading(false);

          setState({
            type: "UPDATE_FORM_STATE",
            payload: { accountName: customerName },
          });
        } catch (e) {
          setValidationErrors({
            ...validationErrors,
            accountName: "Account validation failed please try again",
          });
          setLoading(false);
        }
      })();
    }
  }, [state.meterNo]);

  const handleOnContinue = (e) => {
    e.preventDefault();

    const properties = Object.keys(state);
    const errors = validateFormData(state, properties);

    setValidationErrors({ ...validationErrors, ...errors });

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  const handleStateChange = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });

    setState({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  return (
    <Form
      className={styles.form}
      title="Bill Payment"
      caption="Complete your payment information"
      handleOnSubmit={handleOnContinue}
      autoComplete="off"
      logo={serviceImageUrl}
    >
      <FormGroup>
        <Select
          name="paymentPlan"
          label="Plan"
          error={validationErrors.paymentPlan}
          handleOnChange={(e) => handleStateChange(e)}
        >
          <option value="">Select plan</option>
          <option value="prepaid">Prepaid</option>
          <option value="postpaid">Postpaid</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Input
          name="amount"
          label="Amount"
          type="number"
          placeholder="Enter amount"
          value={state.amount}
          error={validationErrors.amount}
          handleOnChange={(e) => handleStateChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          label="Meter Number"
          name="meterNo"
          value={state.meterNo}
          handleOnChange={(e) => handleStateChange(e)}
          placeholder="Meter number"
          error={validationErrors.meterNo}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          label="Account Name"
          name="accountName"
          value={state.accountName}
          error={validationErrors.accountName}
          loading={loading}
          disabled
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="phone"
          type="text"
          label="Phone Number"
          value={state.phone}
          handleOnChange={(e) => handleStateChange(e)}
          placeholder="Customer's phone number"
          error={validationErrors.phone}
        />
      </FormGroup>
      <Submit type="submit">Continue</Submit>
    </Form>
  );
};

ElectricityPaymentForm.propTypes = {
  ElectricityPaymentFormState: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default ElectricityPaymentForm;
