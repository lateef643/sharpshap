import axios from 'axios';
import { LOGIN_API } from "../store/api/constant";
import setAuthToken from "../util/auth";

const loginUser = ({ user, isAuthenticated }) => {
  return {
    type: "START_LOGIN_USER",
    payload: {
      isAuthenticated,
      user
    }
  }
};

export const startLoginUser = (payload) => (dispatch) => { 
  return axios.post(LOGIN_API, payload)
    .then(res => {
      const user = res.data.data.user;
      const token = res.data.data.token;

      if (user) {
        const authDetails = {
          isAuthenticated: true,
          user
        };

        dispatch(loginUser(authDetails));
        localStorage.setItem('login', JSON.stringify(authDetails));
        setAuthToken(token);
      };
    })
    .catch(err => {
      console.log(err);
    })
};