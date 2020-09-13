import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import BuyDataForm from "./BuyDataForm";
import BuyDataSummary from "./BuyDataSummary";
import BuyDataStatus from "./BuyDataStatus";
import FailedTransaction from "../../../components/shared/FailedTransaction";
import { setCurrentPage } from "../../../actions/page";
import { VEND_DATA } from "../../../store/api/constants";
import style from "./BuyData.module.scss";

const BuyData = ({ changeCurrentPage }) => {
  let renderedComponent;
  const TRANSACTION_COST = 0;
  const [componentToRender, setComponentToRender] = useState("form");
  const [dataPlans, setDataPlans] = useState([]);
  const [telco, setTelco] = useState("");
  const [telcoName, setTelcoName] = useState("");
  const [selectedDataPlanName, setSelectedDataPlanName] = useState("");
  const [selectedDataPlanValidity, setSelectedDataPlanValidity] = useState("");
  const [selectedDataPlanId, setSelectedDataPlanId] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    changeCurrentPage({
      heading: "Buy Data",
      search: false,
    });
  }, [changeCurrentPage]);

  const handleOnSubmit = () => {
    setLoading(true);

    const payload = {
      productId: telco,
      amount,
      bank_code: "9001",
      recipient: phone,
    };

    if (telco && amount && phone) {
      axios
        .post(VEND_DATA, payload)
        .then((res) => {
          const successData = res.data.data;
          setSuccessData(successData);
          setComponentToRender("status");
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            setLoading(false);
            setComponentToRender("failed");
          } else {
            setTimeout(() => {
              setLoading(false);
              setComponentToRender("failed");
            }, 7000);
          }
        });
    }
  };

  const handleAmountChange = (amount) => {
    // const selectedDataPlan = dataPlans.find((plan) => {
    //   return plan.productId === planId;
    // });

    // if (Object.keys(selectedDataPlan).length > 0) {
    //   const amount = String(selectedDataPlan.amount);
    if (!isNaN(amount)) {
      setAmount(amount);
    }
    // }
  };

  const handleTelcoChange = (e) => {
    const telco = JSON.parse(e.target.value);

    if (typeof telco !== "string") {
      const newTelcoName = telco.name;
      const newTelcoCode = telco.name;

      setValidationError({ ...validationError, telco: !newTelcoName });
      setTelco(newTelcoCode);
      setTelcoName(newTelcoName);
    }
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;

    setValidationError({ ...validationError, phone: !newPhone });
    setPhone(newPhone);
  };

  const handleSelectedDataPlanIdChange = (e) => {
    const plan = JSON.parse(e.target.value);

    if (typeof plan !== "string") {
      const newSelectedDataPlanId = plan.productId;

      setValidationError({
        ...validationError,
        selectedDataPlanId: !newSelectedDataPlanId,
      });
      setTelco(plan.productId);
      setSelectedDataPlanId(newSelectedDataPlanId);
      setSelectedDataPlanValidity(plan.validity);
      setSelectedDataPlanName(plan.product_value);
      handleAmountChange(plan.face_value);
    }
  };

  switch (componentToRender) {
    case "form":
      renderedComponent = (
        <BuyDataForm
          handleTelcoChange={handleTelcoChange}
          handlePhoneChange={handlePhoneChange}
          handleSelectedDataPlanIdChange={handleSelectedDataPlanIdChange}
          validationError={validationError}
          setValidationError={setValidationError}
          setComponentToRender={setComponentToRender}
          dataPlans={dataPlans}
          setDataPlans={setDataPlans}
          amount={amount}
          phone={phone}
          selectedDataPlanId={selectedDataPlanId}
          telco={telco}
          telcoName={telcoName}
        />
      );
      break;
    case "summary":
      renderedComponent = (
        <BuyDataSummary
          telcoName={telcoName}
          amount={amount}
          phone={phone}
          selectedDataPlanName={selectedDataPlanName}
          selectedDataPlanValidity={selectedDataPlanValidity}
          handleOnSubmit={handleOnSubmit}
          loading={loading}
        />
      );
      break;
    case "success":
      renderedComponent = (
        <BuyDataStatus
          successData={successData}
          setComponentToRender={setComponentToRender}
          transactionCost={TRANSACTION_COST}
        />
      );
      break;
    case "failed":
      renderedComponent = <FailedTransaction />;
      break;
    default:
      renderedComponent = null;
  }

  return <div className={style.container}>{renderedComponent}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(BuyData);
