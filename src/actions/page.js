import { dispatch } from "react-redux";

const SET_CURRENT_PAGE = (payload) => {
  return {
    type: "SET_CURRENT_PAGE",
    payload
  }
};

export default SET_CURRENT_PAGE;