export const initialState = {
  post: {
    amount: "",
    phone: "",
    adminFee: "",
    total: "",
    token: "",
    reference: "",
  },
  accept: {
    amount: "",
    reference: "",
    adminFee: "",
    total: "",
    token: "",
  },
  release: {
    token: "",
    reference: "",
  },
  cancel: {
    token: "",
    reference: "",
  },
};

const cashCallReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_POST_CASHCALL_STATE":
      return { ...state, post: { ...state.post, ...payload } };
    case "UPDATE_ACCEPT_CASHCALL_STATE":
      return { ...state, accept: { ...state.accept, ...payload } };
    case "UPDATE_CANCEL_CASHCALL_STATE":
      return { ...state, accept: { ...state.accept, ...payload } };
    case "UPDATE_RELEASE_FUNDS_STATE":
      return { ...state, accept: { ...state.accept, ...payload } };
    default:
      return state;
  }
};

export default cashCallReducer;
