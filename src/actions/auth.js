import axios from 'axios';
import { LOGIN_API } from "../store/api/constants";
import setAuthToken from "../util/auth";
import isEmpty from "../validation/isEmpty";
import history from "../util/history";

const loginUser = ({ user, isAuthenticated, walletBalance, transactionSettings }) => {
  return {
    type: "START_LOGIN_USER",
    payload: {
      isAuthenticated,
      user,
      walletBalance,
      transactionSettings
    }
  }
};

export const startLoginUser = payload => dispatch => { 
  return axios.post(LOGIN_API, payload)
    .then(res => {
      const user = res.data.data.user;
      const token = res.data.data.token;
      const walletBalance = res.data.data.wallet.current_bal;
      const transactionSettings = res.data.data.settings;

      if (!isEmpty(user)) {
        const authDetails = {
          isAuthenticated: true,
          user,
          walletBalance,
          transactionSettings
        };

        dispatch(loginUser(authDetails));
        sessionStorage.setItem('user', JSON.stringify(authDetails));
        sessionStorage.setItem('token', token);
        setAuthToken(token);
      };
    })
    .catch(err => {
      console.log('catch block run')
      if (err.response && err.response.status === 401) {
        dispatch({
          type: "SET_LOADING",
          payload: {
            loading: false,
            message: "Username or Password Incorrect"         
          }
        })        
      } else {
        console.log('else block run')
        setTimeout(() => {
          dispatch({
            type: "SET_LOADING",
            payload: {
              loading: false,
              message: undefined       
            }
          })           
        }, 4000);
      }
    })
};

export const logoutUser = () => {
  return {
    type: "START_LOGOUT_USER"
  }
};

export const startLogout = () => dispatch => {
  dispatch({
    type: "SET_LOADING",
    payload: {
      loading: false,
      message: undefined       
    }
  });
  
  sessionStorage.clear('user');
  sessionStorage.clear('token');
  history.push("/");
  dispatch(logoutUser());
};