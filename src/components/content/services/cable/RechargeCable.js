import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import RechargeCableForm from "./RechargeCableForm";
import { VEND_STARTIMES } from "../../../../store/api/constants";
import { VEND_MULTICHOICE } from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import RechargeCableStatus from "./RechargeCableStatus";
import RechargeCableSummary from "./RechargeCableSummary";
import style from './RechargeCable.module.scss';

export const RechargeCable = ({ changeCurrentPage }) => {
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState("form");
  const [plans, setPlans] = useState([]);
  const [provider, setProvider] = useState("");
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState({});
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [successPayload, setSuccessPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customerValidationLoading, setCustomerValidationLoading] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [transactionStatus, setTransactionStatus] = useState(false);
  const [getPlansLoading, setGetPlansLoading] = useState(false);

  useEffect(() => {
    changeCurrentPage({
      heading: "Recharge Cable",
      search: false
    });
  }, [changeCurrentPage]);

  const handleOnSubmit = () => {
    setLoading(true);

    let providerApi;

    if (provider === "dstv" || provider === "gotv") {
      providerApi = VEND_MULTICHOICE;
    } else if (provider === "startimes") {
      providerApi = VEND_STARTIMES;
    }
    
    const payload = {
      smartcard: smartCardNumber,
      amount,
      customer_name: "MOBILE",
      product_code: code,
      period: planDuration,
      service: provider      
    };
        axios.post(providerApi, payload)
        .then(res => {
          const successMessage = res.data.data.statusDescription.message;
          setSuccess(successMessage);
          setLoading(false);
          setProvider("");
          setSmartCardNumber("");
          setPlanDuration("");
          setAmount("");  
          setPlan("");
          setCode("");
          setValidationError({});
          setSuccessPayload(res.data.data);
        })
        .catch(err => {
          if (err.response && err.response.status === 403) {
            const errorMessage = err.response.data.message;
            setError(errorMessage);
            setLoading(false);
          } else {
            setTimeout(() => {
              setLoading(false);
              setError('Transaction failed please try again later');
            }, 7000)
          }          
        })   
  };

  const handleProviderChange = (e) => {
    const newProviderCode = e.target.value;
    validationError.provider = !newProviderCode;
    setProvider(newProviderCode);
    
  };

  const handleSmartCardNumberChange = (e) => {
    const newSmartCardNumber = e.target.value;
    validationError.smartCardNumber = !newSmartCardNumber;
    setSmartCardNumber(newSmartCardNumber);
  };

  const handlePlanChange = (e) => {
    const newPlan = JSON.parse(e.target.value);
    validationError.code = !newPlan.code;
    setPlan(newPlan);
    setCode(newPlan.code);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    validationError.phone = !newPhone;
    setPhone(newPhone);
  };

  const handlePlanDurationChange = (e) => {
    const newDuration = e.target.value;
    validationError.planDuration = !newDuration
    setPlanDuration(newDuration);
    handlePlanAmountChange(newDuration);
  };

  const handlePlanAmountChange = (data) => {
    let selectedPlan;
    let amount;

    if (typeof data == "string") {
      if (plan.availablePricingOptions) {
        selectedPlan = plan.availablePricingOptions.find(plan => {
          return plan.monthsPaidFor == data;
        });
      }

      amount = selectedPlan ? selectedPlan.price : "";
    } else {
      amount = data.target.value;
    }

    setValidationError({ ...validationError, amount: !amount });
    setAmount(amount);
  };

  switch(componentToRender) {
    case ("form"):
      renderedComponent = <RechargeCableForm 
        handleProviderChange={handleProviderChange}
        handleSmartCardNumberChange={handleSmartCardNumberChange}
        handlePlanChange={handlePlanChange}
        handlePlanDurationChange={handlePlanDurationChange}
        handlePlanAmountChange={handlePlanAmountChange}
        handlePhoneChange={handlePhoneChange}
        setCustomerValidationLoading={setCustomerValidationLoading}
        customerValidationLoading={customerValidationLoading}
        setGetPlansLoading={setGetPlansLoading}
        getPlansLoading={getPlansLoading}
        validationError={validationError}
        setCustomerName={setCustomerName}
        setValidationError={setValidationError}
        setComponentToRender={setComponentToRender}
        setPlans={setPlans}
        plans={plans}
        setCode={setCode}
        smartCardNumber={smartCardNumber}
        amount={amount}
        plan={plan}
        provider={provider}
        planDuration={planDuration}
        customerName={customerName}
        code={code}
        phone={phone}
      />;
      break;
    case ("summary"):
      renderedComponent = <RechargeCableSummary 
        smartCardNumber={smartCardNumber}
        provider={provider}
        amount={amount}
        plan={plan.name}
        provider={provider}
        planDuration={planDuration}
        customerName={customerName}
        phone={phone}
        loading={loading}
        handleOnSubmit={handleOnSubmit}
      />;
      break;
    case ("status"):
      renderedComponent = <RechargeCableStatus />;
      break;
    default:
      renderedComponent = null;
    };

  return (
  <div className={style.container}>
    {renderedComponent}
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(RechargeCable);