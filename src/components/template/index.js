import React, { useEffect, useState } from "react";
import axios from "axios";

import { DISBURSE_FUNDS } from "../../../utils/constants";

import Form from "./Form";
import Summary from "./Summary";
import Receipt from "./Receipt";
import Failed from "./Failed";

import styles from "./index.module.scss";

export const FundsTransfer = () => {
  const TRANSACTION_COST = 35;
  const [componentToRender, setComponentToRender] = useState("success");
  const [formState, setFormState] = useState({
    beneficiaryBankCode: "",
    beneficiaryBankName: "",
    amount: "",
    accountNumber: "",
    accountName: "",
    phone: "",
    narration: "",
    total: "",
  });
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleOnSubmit = () => {
    setLoading(true);

    const { accountNumber, beneficiaryBankCode, amount, phone } = formState;

    const req = {
      account_number: accountNumber,
      bank: beneficiaryBankCode,
      amount: amount,
      phone: phone,
    };

    (async function disburseFunds() {
      try {
        const options = {
          headers: {
            lat: agentLocation?.latitude,
            lng: agentLocation?.longitude,
          },
        };

        const res = await axios.post(DISBURSE_FUNDS, req, options);
        const reference = res.data?.data?.Data?.TxnId;
        const status = res.data.status;
        const message = res.data.message;
        const date = new Date();

        //reminding myself to format this date with datefns
        const transactionDate = date;

        setSuccessData({
          message,
          reference,
          status,
          transactionCost: TRANSACTION_COST,
          date: transactionDate,
        });
        setLoading(false);
        setComponentToRender("completed");
      } catch (err) {}
    })();
  };

  return (
    <div className={styles.container}>
      {
        {
          form: (
            <Form
              formState={formState}
              setFormState={setFormState}
              setComponentToRender={setComponentToRender}
              transactionCost={TRANSACTION_COST}
            />
          ),
          summary: (
            <Summary
              formState={formState}
              loading={loading}
              handleOnSubmit={handleOnSubmit}
              transactionCost={TRANSACTION_COST}
            />
          ),
          success: (
            <Receipt
              successData={successData}
              setComponentToRender={setComponentToRender}
              formState={formState}
            />
          ),
          failed: <Failed />,
        }[componentToRender]
      }
    </div>
  );
};

export default FundsTransfer;
