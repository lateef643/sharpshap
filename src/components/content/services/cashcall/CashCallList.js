import React, { useState, useEffect } from "react";
import Axios from "axios";

import ListLoader from "../../../partials/ListLoader";
import { GET_CASHCALL_LIST } from "../../../../store/api/constants";

import styles from "./CashCallList.module.scss";

export const CashCallList = ({ acceptCash, acceptCashLoading }) => {
  const [cashCallList, setCashCallList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageChangeLoading, setPageChangeLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let isCancelled = false;
    
    (async function getCashcallList() {
      try {
        const res = await Axios.get(GET_CASHCALL_LIST)
        const cashCallList = res.data.data;

        if (!isCancelled) {
          setLoading(false)
          setCashCallList(cashCallList)
        }
      } catch (e) {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    })();
    return () => {
      isCancelled = true;
    }
  }, [])

  const handleAcceptCash = () => {
    acceptCash();
  }

  return (
    <div className={styles.container}>
      {loading || pageChangeLoading ? <div className={styles.loaderContainer}><ListLoader /></div> : undefined}
      {!loading && cashCallList.length > 0 ? 
      <div className={styles.heading}>
        <span className={styles.itemOne}>S/N</span>
        <span className={styles.itemTwo}>Amount</span>
        <span className={styles.itemThree}>Description</span>
        <span className={styles.itemFour}>Date</span>
        <span className={styles.itemFive}>Status</span>
        <span className={styles.itemSix}>Accept</span>
      </div> : undefined}
      {!loading || !pageChangeLoading ? cashCallList.map((cashcall, index) => {
        return (
          <div className={styles.log} key={`${index + 1}--log`}>
            <span className={styles.itemOne}>{index + 1}</span>
            <span className={styles.itemTwo}>&#8358;{cashcall.amount}</span>
            <span className={styles.itemThree}>Agent cash request</span>
            <span className={styles.itemFour}>{cashcall.created_at}</span>
            <span className={styles.itemFive}>{cashcall.status}</span>
            {cashcall.status === "initiated" ? 
              <button onClick={handleAcceptCash} className={`${styles.itemSix} ${styles.acceptButton}`}>
                Accept</button> : <button disabled className={`${styles.itemSix} ${styles.acceptButton} ${styles.acceptDisabled}`}>
                Accept</button> 
            }
          </div>
        )
      })  : undefined}
    </div>
  )
}

export default CashCallList;