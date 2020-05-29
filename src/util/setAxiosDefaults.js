import axios from "axios";

const setAxiosDefaults = () => {
  axios.defaults.timeout = 180000;
};

export default setAxiosDefaults;

