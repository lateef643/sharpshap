import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import authReducer from "../../reducers/auth";
import pageReducer from "../../reducers/page";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      page: pageReducer
    }),
    composeEnhancer(applyMiddleware(thunk))
  );
  return store
};