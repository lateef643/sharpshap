import React from "react";
import Login from "../components/pages/Login";
import Dashboard from "../components/pages/Dashboard";
import Terminals from "../components/pages/Terminals";
import TransactionLog from "../components/content/transactions/TransactionLog";
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
    path: "/list-users",
    main: () => <ListUsers />
  },
  {
    path: "/my-terminals",
    main: () => <Terminals />
  },
  {
    path: "/transactions",
    main: () => <TransactionLog />
  }
];

const AppRouter = () => (
  <Container routes={routes} />
);

export default AppRouter;
