import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { connect } from "react-redux";

import { CASHCALL_REQUEST_CASH } from "../../../../store/api/constants";
import { CASHCALL_ACCEPT_CASH } from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import CashCallRequestForm from "./CashCallRequestForm";
import CashCallList from "./CashCallList";
import CashCallVerification from "./CashCallVerification";
import CashCallCompleted from "./CashCallCompleted";
import cashCallReducer, { initialState } from "./cashcall-reducer";

import styles from "./CashCall.module.scss";

export const CashCall = ({ changeCurrentPage }) => {
  const [cashCallState, dispatch] = useReducer(cashCallReducer, initialState);
  const [status, setStatus] = useState("form");
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [acceptCashLoading, setAcceptCashLoading] = useState(false);

  useEffect(() => {
    changeCurrentPage({
      heading: "Cash Call",
      search: false
    });
  }, []);

  useEffect(() => {
    if (!isNaN(parseInt(cashCallState.amount))) {
      const transactionCost = 0.1 * cashCallState.amount;
      const total = +cashCallState.amount + transactionCost;

      dispatch({
        type: "UPDATE_REQUEST_STATE",
        payload: { total }
      })      
    } else {
      const total = 0;
      
      dispatch({
        type: "UPDATE_REQUEST_STATE",
        payload: { total }
      })
    }
  }, [cashCallState.amount]);

  const requestCash = () => {
    setLoading(true)
    const {amount, phone } = cashCallState;

    (async function() {
      const req = {
        amount: amount,
        phone,
        location: 2
      }
      try {
        const res = await Axios.post(CASHCALL_REQUEST_CASH, req)
        const reference = res.data.data.uuid;
        const date = res.data.data.created_at;

        dispatch({
          type: "UPDATE_REQUEST_STATE",
          payload: { reference  }
        })

        dispatch({
          type: "UPDATE_REQUEST_STATE",
          payload: { date }
        })
        setLoading(false);
        setStatus("list");          
      } catch(e) {
        setLoading(false);
      }
    })();
  }

  const acceptCash = () => {
    setAcceptCashLoading(true);
    const { reference } = cashCallState;

    (async function() {
      const req = {
        reference
      }

      try {
        const res = await Axios.post(CASHCALL_ACCEPT_CASH, req)
        setAcceptCashLoading(false);
        setStatus("verification");
      } catch(e) {
        setAcceptCashLoading(false);
        setStatus("verification");
      }
    })();
  }

  const verifyCashCall = () => {
    verificationLoading(true);
    const { token } = cashCallState;

    (async function() {
      const req = {
        token
      }
      try {
        const res = await Axios.post(CASHCALL_ACCEPT_CASH, req)
        setVerificationLoading(false);
        setStatus("completed");
      } catch(e) {
        setVerificationLoading(false);
      }
    })();    
  }

  return (
    <div className={styles.container}>
      {
        {
          form: <CashCallRequestForm 
            cashCallState={cashCallState}
            requestCash={requestCash}
            loading={loading}
            dispatch={dispatch}
          />,
          list: <CashCallList
            acceptCash={acceptCash}
            acceptCashLoading={acceptCashLoading}
          />,
          verification: <CashCallVerification 
            cashCallState={cashCallState}
            verifyCashCall={verifyCashCall}
            verificationLoading={verificationLoading}
            dispatch={dispatch}
          />,
          completed: <CashCallCompleted 
            cashCallState={cashCallState}
          />
        }[status]
      }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
}

CashCall.propTypes = {
  changeCurrentPage: PropTypes.func.isRequired
}
export default connect(undefined, mapDispatchToProps)(CashCall);