import { lazy } from "react";

const AddUser = lazy(() => import("../features/users/AddUser"));
const Users = lazy(() => import("../features/users/index"));
const FundWallet = lazy(() =>
  import("../features/services/fundWallet/FundWallet")
);
const CashCall = lazy(() => import("../features/services/cashcall/CashCall"));
const FundsTransfer = lazy(() => import("../features/services/transfer/index"));
const BuyAirtime = lazy(() => import("../features/services/airtime/index"));
const ElectricityPayment = lazy(() =>
  import("../features/services/electricity/index")
);
const BuyData = lazy(() => import("../features/services/data/index"));
const RechargeCable = lazy(() => import("../features/services/cable/index"));
const BuyInsurance = lazy(() =>
  import("../features/services/insurance/BuyInsurance")
);
const WalletLog = lazy(() => import("../features/logs/wallet/WalletLog"));
const TransactionLog = lazy(() =>
  import("../features/logs/transactions/TransactionLog")
);
const Profile = lazy(() => import("../features/profile/Profile"));
const WalletTransfer = lazy(() =>
  import("../features/services/walletTransfer/WalletTransfer")
);
// const NewTransaction = lazy(() => import("../pages/NewTransaction"));
const BillPayment = lazy(() => import("../pages/BillPayment"));
const AirtimeData = lazy(() => import("../pages/AirtimeData"));
const Overview = lazy(() => import("../pages/Overview"));
const Contact = lazy(() => import("../pages/Contact"));
// const Terminals = lazy(() => import("../pages/Terminals"));
// const Betting = lazy(() => import("../components/content/services/betting/Betting"));
const CashCallPage = lazy(() => import("../pages/CashCall"));
const ActivityLog = lazy(() => import("../features/logs/wallet/ActivityLog"));
const TransactionDetails = lazy(() =>
  import("../components/common/TransactionDetails")
);
// const AggregatorDashboard = lazy(() => import("../features/aggregator/Dashboard"));
// const Aggregator = lazy(() => import("../features/aggregator/index"));
// const CreateAgent = lazy(() => import("../features/aggregator/createAgent/index"));
// const AgentList = lazy(() => import("../features/aggregator/AgentList"));
// const CommissionHistory = lazy(() => import("../features/aggregator/CommissionHistory"));

const routes = [
  {
    path: "/",
    exact: true,
    component: Overview,
  },
  {
    path: "/overview",
    component: Overview,
  },
  // {
  //   path: "/login",
  //   component: Login,
  // },
  {
    path: "/contact-us",
    component: Contact,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/list-users",
    component: AddUser,
  },
  // {
  //   path: "/my-terminals",
  //   component: Terminals,
  // },
  {
    path: "/transactions",
    exact: true,
    component: TransactionLog,
  },
  {
    path: "/transactions/log",
    exact: true,
    component: TransactionLog,
  },
  // {
  //   path: "/transactions/new",
  //   exact: true,
  //   component: NewTransaction,
  // },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/wallet",
    exact: true,
    component: WalletLog,
  },
  {
    path: "/wallet/fund",
    exact: true,
    component: FundWallet,
  },
  {
    path: "/wallet/transfer",
    exact: true,
    component: WalletTransfer,
  },
  {
    path: "/wallet/log",
    exact: true,
    component: WalletLog,
  },
  {
    path: "/activity-log",
    component: ActivityLog,
  },
  //passing props to transaction details because we need match to extract id
  {
    path: "/transaction-details/:id",
    component: TransactionDetails,
  },
  {
    path: "/buy-airtime",
    component: BuyAirtime,
  },
  {
    path: "/pay-electricity",
    component: ElectricityPayment,
  },
  {
    path: "/buy-data",
    component: BuyData,
  },
  {
    path: "/recharge-cable",
    component: RechargeCable,
  },
  {
    path: "/buy-insurance",
    component: BuyInsurance,
  },
  {
    path: "/transfer",
    component: FundsTransfer,
  },
  {
    path: "/bill-payment",
    component: BillPayment,
  },
  {
    path: "/airtime-data",
    component: AirtimeData,
  },
  // {
  //   path: "/betting",
  //   component: Betting
  // }
  {
    path: "/cash-call",
    exact: true,
    component: CashCallPage,
  },
  {
    path: "/cash-call/:id",
    component: CashCall,
  },
  // {
  //   path: "/aggregator",
  //   component: Aggregator,
  //   // exact: true,
  //   routes: [
  //     {
  //       path: "/aggregator",
  //       exact: true,
  //       component: AggregatorDashboard,
  //     },
  //     {
  //       path: "/aggregator/dashboard",
  //       exact: true,
  //       component: AggregatorDashboard,
  //     },
  //     {
  //       path: "/aggregator/agent-list",
  //       component: AgentList,
  //     },
  //     {
  //       path: "/aggregator/create-agent",
  //       component: CreateAgent,
  //     },
  //     {
  //       path: "/aggregator/commission-history",
  //       component: CommissionHistory,
  //     },
  //   ],
  // },
];

export default routes;
