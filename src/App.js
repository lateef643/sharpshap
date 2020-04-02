import React from 'react';
import { Provider } from "react-redux";
// import createHistory from "history/createBrowserHistory";
import axios from "axios";
import configureStore from './store/redux/configureStore';
import AppRouter from "../src/routes/AppRouter";
import './App.scss';

const token = localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common = {'Authorization': `Token ${token}`};
  console.log(axios.defaults.headers);
} else {
  delete axios.defaults.headers.common['Authorization'];
};

const store = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        {/* <AppRouter history={history} /> */}
        <AppRouter />
      </div>      
    </Provider>
  );
}

export default App;
