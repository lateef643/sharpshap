import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common = {'Authorization': `Token ${token}`};
    console.log(axios.defaults.headers);
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;