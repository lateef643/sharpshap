import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { WALLET_TRANSFER } from "../../../../store/api/constants";
import WalletTransferForm from "./WalletTransferForm";
import WalletTransferStatus from "./WalletTransferStatus";
import WalletTransferSummary from "./WalletTransferSummary";
import FailedTransaction from "../../../shared/FailedTransaction";
import styles from "./WalletTransfer.module.scss";
import transferReducer, { initialState } from "./transfer-reducer";

export const WalletTransfer = () => {
  const [transferDetails, dispatch] = useReducer(transferReducer, initialState);
  const [status, setStatus] = useState("form");
  const [successData, setSuccessData] = useState({});
  const [loading, setLoading] = useState(false);
  const [transactionDate, setTransactionDate] = useState(null);
  const [agentLocation, setAgentLocation] = useState(null);

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

  const getTransactionDate = (date) => {
    const dateString = date.toString();
    return dateString.slice(0, 24);
  };

  const handleWalletTransfer = () => {
    setLoading(true);

    const { amount, wallet_id } = transferDetails;

    const req = {
      wallet_id,
      amount,
    };

    (async function transferFunds() {
      try {
        const options = {
          headers: {
            lat: agentLocation?.latitude,
            lng: agentLocation?.longitude,
          },
        };

        const res = await axios.post(WALLET_TRANSFER, req, options);

        const date = new Date();
        const transactionDate = getTransactionDate(date);

        setTransactionDate(transactionDate);
        setSuccessData(res.data.data);
        setStatus("status");
      } catch (e) {
        setStatus("failed");
      }
    })();
  };

  return (
    <div className={styles.container}>
      {
        {
          form: (
            <WalletTransferForm
              dispatch={dispatch}
              setStatus={setStatus}
              state={transferDetails}
            />
          ),
          summary: (
            <WalletTransferSummary
              handleWalletTransfer={handleWalletTransfer}
              loading={loading}
              state={transferDetails}
            />
          ),
          status: (
            <WalletTransferStatus
              date={transactionDate}
              successData={successData}
              setStatus={setStatus}
            />
          ),
          failed: <FailedTransaction />,
        }[status]
      }
    </div>
  );
};

export default WalletTransfer;
