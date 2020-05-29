import React from "react";

import Login from "../components/pages/Login";
import Dashboard from "../components/pages/Dashboard";
import Contact from "../components/pages/Contact";
import Terminals from "../components/pages/Terminals";
import TransactionLog from "../components/content/transactions/TransactionLog";
import AddUser from "../components/content/users/AddUser";
import ListUsers from "../components/content/users/ListUsers";
import NewTransaction from "../components/content/transactions/NewTransaction";
import FundWallet from "../components/content/wallet/fundWallet/FundWallet";
import WalletLog from "../components/content/wallet/logs/WalletLog";
import FundsTransfer from "../components/content/services/transfer/FundsTransfer";
import ActivityLog from "../components/content/wallet/logs/ActivityLog";
import TransactionDetails from "../components/shared/TransactionDetails";
import BuyAirtime from "../components/content/services/airtime/BuyAirtime";
import ElectricityPayment from "../components/content/services/electricity/ElectricityPayment";
import BuyData from "../components/content/services/data/BuyData";
import RechargeCable from "../components/content/services/cable/RechargeCable";
import BuyInsurance from "../components/content/services/insurance/BuyInsurance";
import Profile from "../components/content/profile/Profile";
import WalletTransfer from "../components/content/wallet/walletTransfer/WalletTransfer";
import BillPayment from "../components/pages/BillPayment";
import AirtimeData from "../components/pages/AirtimeData";
// import Betting from "../components/content/services/betting/Betting";

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
    path: "/contact-us",
    main: () => <Contact />
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
    path: "/transaction-log",
    main: () => <TransactionLog />
  },
  {
    path: "/new-transaction",
    main: () => <NewTransaction />
  },
  {
    path: "/profile",
    main: () => <Profile />
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
  //passing props to transaction details because we need match to extract id
  {
    path: "/transaction-details/:id",
    main: (props) => <TransactionDetails {...props} />
  },
  {
    path: "/buy-airtime",
    main: () => <BuyAirtime />
  },
  {
    path: "/pay-electricity",
    main: () => <ElectricityPayment />
  },
  {
    path: "/buy-data",
    main: () => <BuyData />
  },
  {
    path: "/wallet-transfer",
    main: () => <WalletTransfer />
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
    main: () => <FundsTransfer />
  },
  {
    path: "/bill-payment",
    main: () => <BillPayment />
  },
  {
    path: "/airtime-data",
    main: () => <AirtimeData />
  },
  // {
  //   path: "/betting",
  //   main: () => <Betting />
  // }
];

export default routes;