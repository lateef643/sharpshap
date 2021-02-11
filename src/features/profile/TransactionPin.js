import React, { useState } from "react";
import OtpInput from "react-otp-input";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { connect } from "react-redux";

import { SET_PIN } from "../../utils/constants";
import { setDisplayModal } from "../../actions/modal";

import styles from "./TransactionPin.module.scss";
import { useToasts } from "react-toast-notifications";

const Pin = ({ formState, setStatus, handleChange }) => {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();

        if (formState.otp.length === 4) {
          setStatus("confirm");
        }
      }}
      autoComplete="off"
    >
      <div className={styles.formBanner}></div>
      <h3 className={styles.formHeading}>Transaction Pin</h3>
      <p className={styles.formText}>Enter your transaction pin to proceed</p>
      <div className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <OtpInput
            value={formState.otp}
            onChange={handleChange}
            numInputs={4}
            inputStyle={styles.input}
            separator={
              <span style={{ display: "inline-block", width: "2rem" }}></span>
            }
          />
        </div>
      </div>
      <button type="submit" className={styles.button}>
        Continue
      </button>
    </form>
  );
};

const PinConfirmation = ({ formState, handleChange, loading, setPin }) => {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();

        if (formState.otp_confirmation.length === 4) {
          setPin();
        }
      }}
      autoComplete="off"
    >
      <div className={styles.formBanner}></div>
      <h3 className={styles.formHeading}>Transaction Pin</h3>
      <p className={styles.formText}>Enter your transaction pin to proceed</p>
      <div className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <OtpInput
            value={formState.otp_confirmation}
            onChange={handleChange}
            numInputs={4}
            inputStyle={styles.input}
            separator={
              <span style={{ display: "inline-block", width: "2rem" }}></span>
            }
          />
        </div>
      </div>
      <button type="submit" className={styles.button}>
        {loading ? <ThreeDots /> : "Proceed"}
      </button>
    </form>
  );
};

export const TransactionPin = ({ displayModal }) => {
  const [status, setStatus] = useState("pin");
  const [formState, setFormState] = useState({
    otp: "",
    otp_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const handleChange = (otp) => setFormState({ ...formState, otp });

  const handleConfirmationChange = (otp_confirmation) =>
    setFormState({ ...formState, otp_confirmation });

  const setPin = () => {
    (async function setPin() {
      setLoading(true);

      const payload = {
        pin: formState.otp,
        pin_confirmation: formState.otp_confirmation,
      };
      try {
        const res = await axios.post(SET_PIN, payload);

        if (res) {
          addToast("Pin set successfully", {
            appearance: "success",
            autoDismiss: false,
          });

          displayModal({
            overlay: false,
            modal: false,
          });
        }
      } catch (e) {
        addToast("Pin set successfully", {
          appearance: "success",
          autoDismiss: false,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <>
      {
        {
          pin: (
            <Pin
              formState={formState}
              setStatus={setStatus}
              handleChange={handleChange}
            />
          ),
          confirm: (
            <PinConfirmation
              formState={formState}
              setStatus={setStatus}
              handleChange={handleConfirmationChange}
              setPin={setPin}
              loading={loading}
            />
          ),
        }[status]
      }
    </>
  );
};

TransactionPin.propTypes = {
  TransactionPinState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(TransactionPin);
