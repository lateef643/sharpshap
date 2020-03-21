import axios from 'axios';

export const startRegisterUser = (payload, history) => dispatch => {
  axios.post("", payload)
    .then(res => {
      history.push('/profile');
    })
    .catch(err => {
      console.log(err);
    })
}

export const startLogin = (payload, history) => (dispatch) => {
  return axios.post("", payload)
    .then(res => {
      history.push('/profile');
    })
    .catch(err => {
      console.log(err);
    })
}