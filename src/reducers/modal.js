import { DISPLAY_MODAL } from "../utils/types";

export const initialState = {
  overlay: false,
  modal: false,
};

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DISPLAY_MODAL:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default modalReducer;
