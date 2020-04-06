import axios from 'axios';
import { LOGIN_API } from "../store/api/constants";
import setAuthToken from "../util/auth";
import isEmpty from "../validation/isEmpty";
import history from "../util/history";

const loginUser = ({ user, isAuthenticated, wallet }) => {
  return {
    type: "START_LOGIN_USER",
    payload: {
      isAuthenticated,
      user,
      wallet
    }
  }
};

export const startLoginUser = payload => dispatch => { 
  return axios.post(LOGIN_API, payload)
    .then(res => {
      const user = res.data.data.user;
      const token = res.data.data.token;
      const walletBalance = res.data.data.wallet.current_bal;

      if (!isEmpty(user)) {
        const authDetails = {
          isAuthenticated: true,
          user,
          walletBalance
        };

        dispatch(loginUser(authDetails));
        sessionStorage.setItem('user', JSON.stringify(authDetails));
        sessionStorage.setItem('token', token);
        setAuthToken(token);
      };
    })
    .catch(err => {
      console.log(err);
    })
};

export const logoutUser = () => {
  return {
    type: "START_LOGOUT_USER"
  }
};

export const startLogout = () => dispatch => {
  localStorage.clear('user');
  localStorage.clear('token');
  history.push("/");
  dispatch(logoutUser());
};