let initialState;

const loginDetails = JSON.parse(sessionStorage.getItem("user"));

if (loginDetails) {
  initialState = loginDetails;
} else {
  initialState = {
    isAuthenticated: false,
    user: {},
    walletBalance: 0,
    transactionSettings: {},
  };
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOGIN_USER":
      return action.payload;
    case "START_LOGOUT_USER":
      return {};
    default:
      return state;
  }
};

export default auth;
