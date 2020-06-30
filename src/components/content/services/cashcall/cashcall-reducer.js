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
};

const cashCallReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_POST_CASHCALL_STATE":
      return { ...state, post: { ...state.post, ...payload } };
    case "UPDATE_ACCEPT_CASHCALL_STATE":
      return { ...state, accept: { ...state.accept, ...payload } };
    default:
      return state;
  }
};

export default cashCallReducer;
