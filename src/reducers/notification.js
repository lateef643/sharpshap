const initialState = {
  notifications: [
    {
      title: `announcement`,
      body: `Dear Agent, please fund your wallets by making deposits to this account: 
        CICOSERVE PAYMENTS 6434029012 FCMB, 
        please note that this is only temporary as we are working towards automating the process shortly.`,
    },
  ],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_NOTIFICATIONS":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    default:
      return state;
  }
};

export default notificationReducer;
