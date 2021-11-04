export const createNotification = (payload) => {
  return {
    type: "ADD_TO_NOTIFICATIONS",
    payload,
  };
};
