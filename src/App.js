import React from 'react';
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
import AppRouter from "../src/routes/AppRouter";
import './App.scss';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <AppRouter />
      </div>      
    </Provider>
  );
}

export default App;
