import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  RELEASE_FUNDS,
  ACCEPT_OPPORTUNITY,
  INITIATE_PHYSICAL_CASHCALL,
  INITIATE_LIQUID_CASHCALL,
  CANCEL_CASHCALL,
  POST_OPPORTUNITY,
} from "../../../utils/constants";
import { setCurrentPage } from "../../../actions/page";
import CashCallRequestForm from "./CashCallRequestForm";
import CashCallList from "./CashCallList";
import PostCashCallForm from "./PostCashCallForm";
import cashCallReducer, { initialState } from "./cashcall-reducer";
import CashCallSuccess from "./CashCallSuccess";
import { createNotification } from "../../../actions/notification";

import caution from "../../../assets/images/warning-alert-svgrepo-com.svg";
import styles from "./CashCall.module.scss";

export const CashCall = ({
  changeCurrentPage,
  match,
  agentPhoneNumber,
  createNotification,
}) => {
  let history = useHistory();
  const cashCallType = match.params.id;
  const [cashCallState, dispatch] = useReducer(cashCallReducer, initialState);
  const [status, setStatus] = useState(cashCallType === "1" ? "form" : "list");
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [cashCallCompleteStatus, setCashCallCompleteStatus] = useState(null);
  const [error, setError] = useState("");
  const [agentLocation, setAgentLocation] = useState(null);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    changeCurrentPage({
      heading: "Cash Call",
      search: false,
    });
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setAgentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: "UPDATE_POST_CASHCALL_STATE",
      payload: { phone: agentPhoneNumber },
    });

    dispatch({
      type: "UPDATE_ACCEPT_CASHCALL_STATE",
      payload: { phone: agentPhoneNumber },
    });
  }, []);

  useEffect(() => {
    if (cashCallType === "1") {
      if (!isNaN(parseInt(cashCallState.post.amount))) {
        const transactionCost = 500;
        const total = +cashCallState.post.amount + transactionCost;

        dispatch({
          type: "UPDATE_POST_CASHCALL_STATE",
          payload: { adminFee: transactionCost },
        });

        dispatch({
          type: "UPDATE_POST_CASHCALL_STATE",
          payload: { total },
        });
      } else {
        const total = 0;

        dispatch({
          type: "UPDATE_POST_CASHCALL_STATE",
          payload: { total },
        });
      }
    } else if (cashCallType === "2") {
      if (!isNaN(parseInt(cashCallState.accept.amount))) {
        const transactionCost = 0.1 * cashCallState.accept.amount;
        const total = +cashCallState.accept.amount + transactionCost;

        dispatch({
          type: "UPDATE_ACCEPT_CASHCALL_STATE",
          payload: { adminFee: transactionCost },
        });

        dispatch({
          type: "UPDATE_ACCEPT_CASHCALL_STATE",
          payload: { total },
        });
      } else {
        const total = 0;

        dispatch({
          type: "UPDATE_ACCEPT_CASHCALL_STATE",
          payload: { total },
        });
      }
    }
  }, [cashCallState.post.amount, cashCallState.accept.amount]);

  const initiateLiquidCashCall = () => {
    setLoading(true);

    (async function initiateCashcall() {
      const { amount } = cashCallState.post;

      const req = {
        amount: `${amount}`,
        type: "liquid",
        lat: `${agentLocation.latitude}`,
        lng: `${agentLocation.longitude}`,
      };

      try {
        const res = await Axios.post(INITIATE_LIQUID_CASHCALL, req);
        const reference = res.data.data.uuid;

        setLoading(false);
        dispatch({
          type: "UPDATE_POST_CASHCALL_STATE",
          payload: { reference },
        });
        setStatus("verification");
      } catch (e) {
        setLoading(false);
      }
    })();
  };

  const postOpportunity = () => {
    setVerificationLoading(true);

    (async function initiateCashcall() {
      const { reference, token } = cashCallState.post;

      const req = {
        reference,
        token,
      };

      try {
        const res = await Axios.post(POST_OPPORTUNITY, req);

        if (res) {
          setVerificationLoading(false);
          setTokenError(false);
          const permission = Notification.permission;

          if (permission === "granted") {
            var notification = new Notification(
              "We will notify you immediately we match you to an agent"
            );
          }
          createNotification({
            title: "transaction",
            status: true,
            body: "We will notify you immediately we match you to an agent.",
          });
          history.push("/");
        }
      } catch (e) {
        setTokenError(true);
        setVerificationLoading(false);
      }
    })();
  };

  const selectOpportunity = (cashcall) => {
    dispatch({
      type: "UPDATE_ACCEPT_CASHCALL_STATE",
      payload: cashcall,
    });

    setStatus("form");
  };

  const initiatePhysicalCashCall = () => {
    setLoading(true);

    (async function initiateCashcall() {
      const { amount, reference } = cashCallState.accept;

      const req = {
        amount: `${amount}`,
        lat: `${agentLocation.latitude}`,
        lng: `${agentLocation.longitude}`,
        type: "physical",
        reference,
      };

      try {
        const res = await Axios.post(INITIATE_PHYSICAL_CASHCALL, req);

        if (res) {
          dispatch({
            type: "UPDATE_ACCEPT_CASHCALL_STATE",
            payload: { reference: res.data.data.uuid },
          });
          setLoading(false);
          setStatus("verification");
        }
      } catch (e) {
        setStatus("list");
      }
    })();
  };

  const acceptOpportunity = () => {
    setVerificationLoading(true);

    (async function initiateCashcall() {
      const { reference, token } = cashCallState.accept;

      const req = {
        reference,
        token: `${token}`,
      };

      try {
        const res = await Axios.post(ACCEPT_OPPORTUNITY, req);

        if (res) {
          const matchedAgentPhone = res.data.data.match.agent["business_phone"];
          const matchedAgentName = res.data.data.match.agent["business_name"];

          const notification = new Notification(
            `Accept cash: Congratulations, an agent is willing to help. Call this number ${matchedAgentPhone}, ${matchedAgentName} and expect the cash`
          );
          setTokenError(false);
          createNotification({
            title: "transaction",
            status: true,
            body: `Accept cash: Congratulations, an agent is willing to help. /n Call this number: ${matchedAgentPhone}, ${matchedAgentName} and expect the cash`,
          });
          setVerificationLoading(false);
          setStatus("completed");
        }
      } catch (e) {
        setVerificationLoading(false);
        setTokenError(true);
      }
    })();
  };

  const handleOnRequestFormSubmit = () => {
    if (cashCallType === "1") {
      initiateLiquidCashCall();
    } else if (cashCallType === "2") {
      initiatePhysicalCashCall();
    }
  };

  const handleOpportunity = () => {
    if (cashCallType === "1") {
      postOpportunity();
    } else if (cashCallType === "2") {
      acceptOpportunity();
    }
  };

  const releaseFunds = (reference) => {
    setVerificationLoading(true);

    (async function releaseFunds() {
      const { token, reference } = cashCallState.release;

      const req = {
        token,
        reference,
      };

      try {
        const res = await Axios.post(RELEASE_FUNDS, req);

        if (res) {
          const notification = new Notification(
            `View transaction: This transaction was completed.`
          );
          setTokenError(false);
          createNotification({
            title: "transaction",
            status: true,
            body: `View transaction: This transaction was completed`,
          });
          setVerificationLoading(false);
          setStatus("completed");
        }
      } catch (e) {
        setVerificationLoading(false);
        // console.log(e.response);
      }
    })();
  };

  const cancelCashcall = () => {
    (async function releaseFunds() {
      const { token, reference } = cashCallState.cancel;

      const req = {
        token,
        reference,
      };

      try {
        const res = await Axios.post(CANCEL_CASHCALL, req);

        if (res) {
          const notification = new Notification(
            `View transaction: You cancelled this transaction.`
          );
          setTokenError(false);
          createNotification({
            title: "transaction",
            status: false,
            body: `View transaction: You cancelled this transaction`,
          });
          setVerificationLoading(false);
          setStatus("completed");
        }
      } catch (e) {
        setVerificationLoading(false);
        // console.log(e.response);
      }
    })();
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.backButton}
        role="button"
        onClick={() => history.goBack()}
      >
        &#171; Go back
      </div>
      <h2 className={styles.header}>
        {cashCallType === "1" && status == "form"
          ? "Fill the form to find an agent nearby that needs your cash"
          : cashCallType === "1" && status == "verification"
          ? "We sent a verification code to your registered number please enter the code here"
          : undefined}
      </h2>
      {
        {
          form: (
            <CashCallRequestForm
              cashCallState={cashCallState}
              loading={loading}
              dispatch={dispatch}
              cashCallType={cashCallType}
              handleOnRequestFormSubmit={handleOnRequestFormSubmit}
            />
          ),
          list: (
            <CashCallList
              dispatch={dispatch}
              selectOpportunity={selectOpportunity}
              cashCallType={cashCallType}
              setStatus={setStatus}
              setCashCallCompleteStatus={setCashCallCompleteStatus}
              agentLocation={agentLocation}
            />
          ),
          completed: (
            <CashCallSuccess
              cashCallType={cashCallType}
              cashCallCompleteStatus={cashCallCompleteStatus}
            />
          ),
          verification: (
            <PostCashCallForm
              dispatch={dispatch}
              verificationLoading={verificationLoading}
              cashCallState={cashCallState}
              cashCallType={cashCallType}
              handleOpportunity={handleOpportunity}
              cancelCashcall={cancelCashcall}
              releaseFunds={releaseFunds}
              cashCallCompleteStatus={cashCallCompleteStatus}
              error={error}
            />
          ),
        }[status]
      }
      {tokenError ? (
        <div className={styles.tokenWarning}>
          <img src={caution} alt="" />
          <span className={styles.failureText}>Token Failure</span>
          <span>Please try again</span>
        </div>
      ) : undefined}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    agentPhoneNumber: state.auth.user.phone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    createNotification: (payload) => dispatch(createNotification(payload)),
  };
};

CashCall.propTypes = {
  changeCurrentPage: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(CashCall);
