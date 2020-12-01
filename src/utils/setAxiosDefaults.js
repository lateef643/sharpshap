import axios from "axios";

const setAxiosDefaults = () => {
  axios.defaults.timeout = 300000;
};

export default setAxiosDefaults;
