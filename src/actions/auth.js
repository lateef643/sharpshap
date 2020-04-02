import axios from 'axios';
import { LOGIN_API } from "../store/api/constants";
import setAuthToken from "../util/auth";
import isEmpty from "../validation/isEmpty";

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
      const wallet = res.data.data.wallet;
      const token = res.data.data.token;

      if (!isEmpty(user)) {
        const authDetails = {
          isAuthenticated: true,
          user,
          wallet
        };

        dispatch(loginUser(authDetails));
        localStorage.setItem('login', JSON.stringify(authDetails));
        localStorage.setItem('token', token);
        setAuthToken(token);
      };
    })
    .catch(err => {
      console.log(err);
    })
};