import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { connect } from "react-redux";

import {
  RELEASE_FUNDS,
  ACCEPT_OPPORTUNITY,
  INITIATE_PHYSICAL_CASHCALL,
  INITIATE_LIQUID_CASHCALL,
  CANCEL_CASHCALL,
  POST_OPPORTUNITY,
} from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import CashCallRequestForm from "./CashCallRequestForm";
import CashCallList from "./CashCallList";
import PostCashCallForm from "./PostCashCallForm";
import cashCallReducer, { initialState } from "./cashcall-reducer";
import CashCallSuccess from "./CashCallSuccess";

import styles from "./CashCall.module.scss";

export const CashCall = ({ changeCurrentPage, match, agentPhoneNumber }) => {
  const cashCallType = match.params.id;
  const [cashCallState, dispatch] = useReducer(cashCallReducer, initialState);
  const [status, setStatus] = useState(cashCallType === "1" ? "form" : "list");
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [cashCallCompleteStatus, setCashCallCompleteStatus] = useState(null);
  const [error, setError] = useState("");
  const [agentLocation, setAgentLocation] = useState(null);

  useEffect(() => {
    changeCurrentPage({
      heading: "Cash Call ",
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
        const transactionCost = 0.1 * cashCallState.post.amount;
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
      const { amount, phone } = cashCallState.post;

      const req = {
        amount,
        phone,
        type: "liquid",
        latitude: agentLocation.latitude,
        longitude: agentLocation.longitude,
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
          setStatus("completed");
        }
      } catch (e) {
        setVerificationLoading(false);
        setError(e.response.message);
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
    (async function initiateCashcall() {
      const { amount, phone, reference } = cashCallState.accept;

      const req = {
        amount,
        phone,
        type: "physical",
        latitude: agentLocation.latitude,
        longitude: agentLocation.longitude,
        reference,
      };

      try {
        const res = await Axios.post(INITIATE_PHYSICAL_CASHCALL, req);
        if (res) setStatus("verification");
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
        token,
      };

      try {
        const res = await Axios.post(ACCEPT_OPPORTUNITY, req);

        if (res) {
          setVerificationLoading(false);
          setStatus("completed");
        }
      } catch (e) {
        setVerificationLoading(false);
        setError(e.response.message);
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
            />
          ),
          completed: <CashCallSuccess cashCallType={cashCallType} />,
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
  };
};

CashCall.propTypes = {
  changeCurrentPage: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(CashCall);
