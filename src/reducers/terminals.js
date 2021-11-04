const terminalsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TERMINALS":
      return action.payload;
    default:
      return state;
  }
};

export default terminalsReducer;
