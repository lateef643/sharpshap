import AddUser from "../features/users/AddUser";
import Users from "../features/users/index";
import FundWallet from "../features/services/fundWallet/FundWallet";
// import CashCall from "../features/services/cashcall/CashCall";
// import Loan from "../features/services/loan/index";
import FundsTransfer from "../features/services/transfer/index";
import BuyAirtime from "../features/services/airtime/index";
import ElectricityPayment from "../features/services/electricity/index";
import BuyData from "../features/services/data/index";
import RechargeCable from "../features/services/cable/index";
import BuyInsurance from "../features/services/insurance/BuyInsurance";
import WalletLog from "../features/logs/wallet/index";
import TransactionLog from "../features/logs/transactions/TransactionLog";
import Profile from "../features/profile/Profile";
import WalletTransfer from "../features/services/walletTransfer/WalletTransfer";
// import NewTransaction from "../pages/NewTransaction";
import BillPayment from "../pages/BillPayment";
import AirtimeData from "../pages/AirtimeData";
import LoanPage from "../pages/Loan";
import Overview from "../pages/Overview";
import Contact from "../pages/Contact";
// import Terminals from "../pages/Terminals";
import Betting from "../features/services/betting/index";
import PlaceBet from "../features/services/betting/play/Play";
// import CashCallPage from "../pages/CashCall";
// import ActivityLog from "../features/logs/wallet/ActivityLog";
import TransactionDetails from "../components/common/TransactionDetails";
// import AggregatorDashboard from "../features/aggregator/Dashboard";
// import Aggregator from "../features/aggregator/index";
// import CreateAgent from "../features/aggregator/createAgent/index";
// import AgentList from "../features/aggregator/AgentList";
// import CommissionHistory from "../features/aggregator/CommissionHistory";

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
  // {
  //   path: "/activity-log",
  //   component: ActivityLog,
  // },
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
  {
    path: "/loan",
    component: LoanPage,
  },
  {
    path: "/betting",
    component: Betting,
    exact: true,
  },
  {
    path: "/betting/bet",
    component: PlaceBet,
    exact: true,
  },
  // {
  //   path: "/cash-call",
  //   exact: true,
  //   component: CashCallPage,
  // },
  // {
  //   path: "/cash-call/:id",
  //   component: CashCall,
  // },
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
