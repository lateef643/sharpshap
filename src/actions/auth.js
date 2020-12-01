import axios from "axios";

import { LOGIN_API } from "../utils/constants";
import setAuthToken from "../utils/setAuthToken";
import isEmpty from "../validation/isEmpty";
import history from "../utils/history";
import { setWalletBalance } from "./wallet";

const loginUser = ({
  user,
  isAuthenticated,
  walletBalance,
  transactionSettings,
}) => {
  return {
    type: "START_LOGIN_USER",
    payload: {
      isAuthenticated,
      user,
      walletBalance,
      transactionSettings,
    },
  };
};

export const startLoginUser = (payload) => (dispatch) => {
  return axios
    .post(LOGIN_API, payload)
    .then((res) => {
      const user = res.data.data.user;
      const token = res.data.data.token;
      const walletBalance = res.data.data.wallet.current_bal;
      const transactionSettings = res.data.data.settings;

      const { id, username, phone, email, is_default, agent } = user;
      const {
        first_name: firstName,
        last_name: lastName,
        user_id: userId,
        business_name: businessName,
        wallet_no: walletNo,
        uuid,
      } = agent;

      if (!isEmpty(user)) {
        const authDetails = {
          isAuthenticated: true,
          user: {
            id,
            username,
            phone,
            email,
            uuid,
            is_default,
            firstName,
            lastName,
            userId,
            businessName,
            walletNo,
          },
          walletBalance,
          transactionSettings,
        };

        dispatch(loginUser(authDetails));
        dispatch(setWalletBalance(walletBalance));
        sessionStorage.setItem("user", JSON.stringify(authDetails));
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("balance", walletBalance);
        setAuthToken(token);
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        dispatch({
          type: "SET_LOADING",
          payload: {
            loading: false,
            message: "Username or Password Incorrect",
          },
        });
      } else {
        setTimeout(() => {
          dispatch({
            type: "SET_LOADING",
            payload: {
              loading: false,
              message: "Network error",
            },
          });
        }, 4000);
      }
    });
};

export const logoutUser = () => {
  return {
    type: "START_LOGOUT_USER",
  };
};

export const startLogout = () => (dispatch) => {
  dispatch({
    type: "SET_LOADING",
    payload: {
      loading: false,
      message: undefined,
    },
  });

  sessionStorage.clear("user");
  sessionStorage.clear("token");
  sessionStorage.clear("balance");
  history.push("/");
  dispatch(logoutUser());
};
