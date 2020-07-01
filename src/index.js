import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import setAuthToken from "./util/setAuthToken";
import setAxiosDefaults from "./util/setAxiosDefaults";
import configureStore from "./store/redux/configureStore";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";

const token = sessionStorage.getItem("token");

setAuthToken(token);
setAxiosDefaults();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
