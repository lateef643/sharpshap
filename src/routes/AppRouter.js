import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "../components/pages/Login";
import Dashboard from "../components/pages/Dashboard";
import Terminals from "../components/pages/Terminals";
import Transactions from "../components/pages/Transactions";
import Container from "../components/partials/Container";
import AddUser from "../components/content/users/AddUser";
import ListUsers from "../components/content/users/ListUsers";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Dashboard />
  },
  {
    path: "/login",
    main: () => <Login />
  },
  {
    path: "/dashboard",
    main: () => <Dashboard />
  },
  {
    path: "/add-user",
    main: () => <AddUser />
  },
  {
    path: "/add-user",
    main: () => <ListUsers />
  },
  {
    path: "/my-terminals",
    main: () => <Terminals />
  },
  {
    path: "/transactions",
    main: () => <Transactions />
  }
];

const AppRouter = () => (
  <Container routes={routes} />
);

export default AppRouter;
