const initialState = {
  loading: false,
  message: ""
};

const errorReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SET_LOADING":
      return action.payload;
    default: 
      return state;
  }
};

export default errorReducer;