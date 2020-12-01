export const initialFormState = {
  provider: "",
  selectedPlanName: "",
  smartCardNumber: "",
  customerName: "",
  phone: "",
  selectedPlanDuration: "",
  selectedPlanCode: "",
  selectedPlanAmount: "",
  amount: "",
};

const RechargeCableReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_FORM_STATE":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default RechargeCableReducer;
