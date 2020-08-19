import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import history from "./util/history";

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
    <Router history={history}>
      <AppRouter />
    </Router>
  );
};

export default App;
