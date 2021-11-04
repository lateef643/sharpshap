export const initialFormState = {
  selectedPlanName: "",
  smartCardNumber: "",
  customerName: "",
  phone: "",
  selectedPlanCode: "",
  amount: "",
  cycles: [],
  cycle: "",
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
