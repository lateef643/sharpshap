export const setWalletBalance = (balance) => {
  return {
    type: "SET_WALLET_BALANCE",
    payload: { balance },
  };
};
