const initialState = {
  notifications: [
    {
      title: `announcement`,
      body: `Great news! Dear Agent, you can now make electricity payments with CICO! 
        From your home page click on BILL PAYMENT, next click PAY ELECTRICITY to use this exciting new feature.`,
    },
    {
      title: `announcement`,
      body: `Dear Agent, please fund your wallets by making deposits to this account: 
        CICOSERVE PAYMENTS 1001137813 VFD BANK, 
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
