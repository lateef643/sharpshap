export const setTransactionLog = (transactions) => {
  return {
    type: "SET_TRANSACTIONS",
    payload: transactions
  }
};