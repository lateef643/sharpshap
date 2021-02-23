export const initialFormState = {
  accountId: "",
  amount: "",
  phone: ""
};

const FundWalletReducer = (initialFormState, { type, payload }) => {
  switch(type) {
    case "UPDATE_FORM_STATE":
      return {...initialFormState, ...payload};
    default:
      return initialFormState;
  }
};

export default FundWalletReducer;