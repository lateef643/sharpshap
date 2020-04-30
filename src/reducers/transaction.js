const transactionReducer = (state = [], action) => {
    switch(action.type) {
      case "SET_TRANSACTIONS":
        sessionStorage.setItem('transactions', JSON.stringify(action.payload));
        return action.payload;
      default: 
        return state;
    }
  };
  
  export default transactionReducer;