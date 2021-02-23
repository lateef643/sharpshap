import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import pageReducer from "../reducers/page";
import walletReducer from "../reducers/wallet";
// import profileReducer from "../../reducers/profile";
// import transactionReducer from "../../reducers/transaction";
// import terminalsReducer from "../../reducers/terminals";
// import servicesReducer from "../../reducers/services";
import errorReducer from "../reducers/error";
import notificationReducer from "../reducers/notification";
import modalReducer from "../reducers/modal";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      page: pageReducer,
      // profile: profileReducer,
      wallet: walletReducer,
      // transaction: transactionReducer,
      // terminals: terminalsReducer,
      // services: servicesReducer,
      error: errorReducer,
      notification: notificationReducer,
      modal: modalReducer,
    }),
    composeEnhancer(applyMiddleware(thunk))
  );
  return store;
};
