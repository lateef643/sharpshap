import React, { useState, useEffect } from "react";
import Axios from "axios";

import ListLoader from "../../../partials/ListLoader";
import {
  GET_CASHCALL_LIST,
  OPPORTUNITIES_LIST,
} from "../../../../store/api/constants";
import formatToCurrency from "../../../../util/formatToCurrency";

import styles from "./CashCallList.module.scss";

export const CashCallList = ({
  cashCallType,
  dispatch,
  setStatus,
  selectOpportunity,
  setCashCallCompleteStatus,
  agentLocation,
}) => {
  const [cashCallList, setCashCallList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    (async function getCashcallList() {
      let api;

      api = cashCallType === "3" ? GET_CASHCALL_LIST : OPPORTUNITIES_LIST;

      try {
        let res = await Axios.get(api, {
          headers: {
            lat: agentLocation.latitude,
            lng: agentLocation.longitude,
          },
        });

        let cashCallList;

        //Rendering list from two paths
        //i. From the accept opportunity route - cashcalltype is 2, this displays a list of all cashcalls
        //11. From sidebar here cashcalltype is 3, this displays a list of personal cashcalls
        cashCallList = cashCallType === "3" ? res.data.data : res.data.data;

        if (!isCancelled && cashCallList.length !== 0) {
          setLoading(false);
          setCashCallList(cashCallList);
        } else if (!isCancelled && cashCallList.length === 0) {
          setLoading(false);
        }
      } catch (e) {
        if (!isCancelled) {
          setLoading(true);
        }
      }
    })();
    return () => {
      isCancelled = true;
    };
  });

  const handleSelectOpportunity = (cashcall) => {
    const { uuid, amount } = cashcall;

    if (!isNaN(parseInt(amount))) {
      const selectedCashcall = {
        reference: uuid,
        amount: parseInt(amount),
        adminFee: parseInt(amount) * 0.1,
      };

      selectedCashcall.total =
        selectedCashcall.adminFee + selectedCashcall.amount;

      selectOpportunity(selectedCashcall);
    }
  };

  const handleReleaseFunds = (reference) => {
    dispatch({
      type: "UPDATE_RELEASE_FUNDS_STATE",
      payload: { reference },
    });

    setCashCallCompleteStatus("release");
    setStatus("verification");
  };

  const handleCancelCashcall = (reference) => {
    dispatch({
      type: "UPDATE_CANCEL_CASHCALL_STATE",
      payload: { reference },
    });

    setCashCallCompleteStatus("cancel");
    setStatus("verification");
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loaderContainer}>
          <ListLoader />
        </div>
      )}
      {!loading && cashCallList.length === 0 && (
        <div className={styles.noCashcalls}>
          No cashcalls available at the moment, please try again later.
        </div>
      )}
      {!loading && cashCallList.length > 0 && (
        <div className={styles.heading}>
          <span className={styles.itemOne}>S/N</span>
          <span className={styles.itemTwo}>Amount</span>
          <span className={styles.itemThree}>Admin Fee</span>
          <span className={styles.itemFour}>Type</span>
          <span className={styles.itemFive}>Date</span>
          <span className={styles.itemSix}>Status</span>
          <span className={styles.itemSeven}>Accept</span>
        </div>
      )}
      {!loading &&
        cashCallList.map((cashcall, index) => {
          return (
            <div className={styles.log} key={`${index + 1}--log`}>
              <span className={styles.itemOne}>{index + 1}</span>
              <span className={styles.itemTwo}>
                {formatToCurrency(cashcall.amount)}
              </span>
              <span className={styles.itemThree}>
                {formatToCurrency(cashcall.admin_fee)}
              </span>
              <span className={styles.itemFour}>
                {cashcall.type || "Cashcall"}
              </span>
              <span className={styles.itemFive}>{cashcall.created_at}</span>
              <span className={styles.itemSix}>{cashcall.status}</span>
              {/* Rendering three button types depending on transaction status */}
              <div className={styles.itemSeven}>
                {cashcall.type === "physical" &&
                cashcall.status !== "accepted" ? (
                  <>
                    <button
                      className={`${styles.button} ${styles.cancelButton}`}
                      onClick={() => handleCancelCashcall(cashcall.uuid)}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.button} ${styles.releaseFunds}`}
                      onClick={() => handleReleaseFunds(cashcall.uuid)}
                    >
                      Release funds
                    </button>
                  </>
                ) : cashCallType === "2" &&
                  cashcall.type === "liquid" &&
                  cashcall.matched === 0 ? (
                  <button
                    onClick={() => handleSelectOpportunity(cashcall)}
                    className={`${styles.button}`}
                  >
                    I want
                  </button>
                ) : (
                  <button
                    disabled
                    className={`${styles.button} ${styles.buttonDisabled}`}
                  >
                    {cashCallType === "2" && cashcall.type !== "liquid"
                      ? "Unavailable"
                      : cashCallType === "3" && cashcall.status !== "accepted"
                      ? "Self"
                      : cashcall.status === "accepted"
                      ? "Completed"
                      : "Matched"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CashCallList;
