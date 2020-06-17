export const initialState = {
  amount: "",
  phone: "",
  total: "",
  token: "",
  reference: ""
}

const cashCallReducer = (state, { type, payload}) => {
  switch(type) {
    case "UPDATE_REQUEST_STATE":
      return { ...state, ...payload }
    default:
      return state;
  }
}

export default cashCallReducer;