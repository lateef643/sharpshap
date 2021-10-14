import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import history from "./utils/history";
import "./newcss/bootstrap.min.css"
// import "bootstrap/dist/css/bootstrap.min.css";


import AppRouter from "./router/AppRouter";

const App = () => {
  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      (function requestNotification() {
        if (Notification.permission !== "denied") {
          Notification.requestPermission();
        }
      })();
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <ToastProvider>
      <Router history={history}>
        <AppRouter />
      </Router>
    </ToastProvider>
  );
};

export default App;
