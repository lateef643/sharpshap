import React from 'react';
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import configureStore from './store/redux/configureStore';
import AppRouter from "../src/routes/AppRouter";
import './App.scss';

const store = configureStore();

const history = createHistory();

store.subscribe(() => {
  store.getState();
});

export const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <AppRouter history={history} />
      </div>      
    </Provider>
  );
}

export default App;
