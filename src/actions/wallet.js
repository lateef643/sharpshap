export const setWalletBalance = (balance) => {
  console.log("this was hit");
  return {
    type: "SET_WALLET_BALANCE",
    payload: { balance },
  };
};
