import React from "react";
import Login from "../components/pages/Login";
import Dashboard from "../components/pages/Dashboard";
import Terminals from "../components/pages/Terminals";
import TransactionsLog from "../components/content/transactions/TransactionsLog";
import Container from "../components/partials/Container";
import AddUser from "../components/content/users/AddUser";
import ListUsers from "../components/content/users/ListUsers";
import NewTransaction from "../components/content/transactions/NewTransaction";
import FundWallet from "../components/content/wallet/FundWallet";
import WalletLog from "../components/content/wallet/WalletLog";
import Transfer from "../components/content/services/transfer/Transfer";
import ActivityLog from "../components/content/wallet/ActivityLog";
import Withdraw from "../components/content/services/Withdraw/Withdraw";
import SuccessfulTransaction from "../components/shared/SuccessfulTransaction";
import BuyAirtime from "../components/content/services/airtime/BuyAirtime";
import PayElectricity from "../components/content/services/electricity/PayElectricity";
import BuyData from "../components/content/services/data/BuyData";
import RechargeCable from "../components/content/services/cable/RechargeCable";
import BuyInsurance from "../components/content/services/insurance/BuyInsurance";
import MyWallet from "../components/pages/MyWallet";

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
    path: "/transactions-log",
    main: () => <TransactionsLog />
  },
  {
    path: "/new-transaction",
    main: () => <NewTransaction />
  },
  {
    path: "/my-wallet",
    main: () => <MyWallet />
  },
  {
    path: "/fund-wallet",
    main: () => <FundWallet />
  },
  {
    path: "/wallet-log",
    main: () => <WalletLog />
  },
  {
    path: "/activity-log",
    main: () => <ActivityLog />
  },
  {
    path: "/withdraw",
    main: () => <Withdraw />
  },
  {
    path: "/success",
    main: () => <SuccessfulTransaction />
  },
  {
    path: "/buy-airtime",
    main: () => <BuyAirtime />
  },
  {
    path: "/pay-electricity",
    main: () => <PayElectricity />
  },
  {
    path: "/buy-data",
    main: () => <BuyData />
  },
  {
    path: "/recharge-cable",
    main: () => <RechargeCable />
  },
  {
    path: "/buy-insurance",
    main: () => <BuyInsurance />
  },
  {
    path: "/transfer",
    main: () => <Transfer />
  }
];

const AppRouter = () => (
  <Container routes={routes} />
);

export default AppRouter;
