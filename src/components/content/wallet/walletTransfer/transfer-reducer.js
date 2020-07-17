export const initialState = {
  amount: "",
  wallet_id: "",
  agent_name: "",
};

const transferReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_STATE":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default transferReducer;
