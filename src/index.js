import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import axios from "axios";
import configureStore from './store/redux/configureStore';
import AppRouter from "../src/routes/AppRouter";
import * as serviceWorker from './serviceWorker';
import './index.scss';

const token = sessionStorage.getItem('token');
const store = configureStore();

if (token) {
  axios.defaults.headers.common = {'Authorization': `Token ${token}`};
} else {
  delete axios.defaults.headers.common['Authorization'];
};

axios.defaults.timeout = 180000;

export const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <AppRouter />
      </div>      
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
