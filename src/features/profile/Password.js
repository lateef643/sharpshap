import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";

import logo from "../../assets/images/cico-logo.svg";

import Form from "../../components/common/Form";
import FormGroup from "../../components/common/FormGroup";
import Input from "../../components/common/Input";
import Submit from "../../components/common/Button";

import { UPDATE_USER_PASSWORD } from "../../utils/constants";
import validateFormData from "../../validation/validateFormData";

import { setDisplayModal } from "../../actions/modal";

export const Password = ({ displayModal }) => {
  const [formState, setFormState] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { new_password, confirm_password } = formState;

    const payload = {
      new_password,
      confirm_password,
    };

    const keys = Object.keys(payload);
    const errors = validateFormData(formState, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    submit();
  };

  const submit = () => {
    const payload = formState;
    setLoading(true);

    (async function changePassword() {
      try {
        const res = await axios.put(UPDATE_USER_PASSWORD, payload);

        if (res) {
          addToast("Password changed successfully", {
            appearance: "success",
            autoDismiss: true,
          });

          displayModal({
            overlay: false,
            modal: false,
            service: null,
          });
        }
      } catch (e) {
        addToast("An error occurred", {
          appearance: "error",
          autoDismiss: true,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleSetFormState = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });

    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };
  return (
    <Form
      autoComplete="off"
      title="Change password"
      caption="Complete your information"
      handleOnSubmit={handleOnSubmit}
      logo={logo}
    >
      <FormGroup>
        <Input
          name="password"
          label="Password"
          placeholder="Enter password"
          value={formState.password}
          type="password"
          handleOnChange={(e) => handleSetFormState(e)}
          error={validationErrors.password}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="new_password"
          label="New Password"
          value={formState.new_password}
          placeholder="Enter new password"
          type="password"
          handleOnChange={(e) => handleSetFormState(e)}
          error={validationErrors.new_password}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="confirm_password"
          label="Confirm Password"
          placeholder="Confirm password"
          value={formState.confirm_password}
          type="password"
          handleONnChange={(e) => handleSetFormState(e)}
          error={validationErrors.confirm_password}
        />
      </FormGroup>
      <Submit type="submit">{loading ? <ThreeDots /> : "Continue"}</Submit>
    </Form>
  );
};

Password.propTypes = {
  networkList: PropTypes.array.isRequired,
  AirtimePurchaseFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(Password);
