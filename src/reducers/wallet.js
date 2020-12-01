let initialState;

const balance = sessionStorage.getItem("balance");

if (balance) {
  initialState = { balance };
} else {
  initialState = {};
}

const walletReducer = (state = initialState, { type, payload }) => {
  console.log("something");
  switch (type) {
    case "SET_WALLET_BALANCE":
      sessionStorage.setItem("balance", payload.balance);
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default walletReducer;
