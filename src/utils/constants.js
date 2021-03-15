let path;

if (
  window.location.href.indexOf("localhost") >= 0 ||
  window.location.href.indexOf("dev") >= 0
) {
  //development server
  path = "https://api.cico.ng/api";
} else {
  //production server
  path = "https://api.cico.ng/api";
}

//////AUTH///////

//login user - POST
export const LOGIN_API = `${path}/users/login`;

//login and remember user - POST (logs in with email and password and remembers token)
export const LOGIN_EMAIL_API = `${path}/users/login`;

//register user - POST
export const POST_REGISTER_API = `${path}/users/`;

//get current user - GET
export const GET_CURRENT_USER = `${path}/user`;

//Create user/sub agent - POST;
export const CREATE_SUB_USER = `${path}/agents/create-sub`;

//get user - GET
export const GET_USER = `${path}/user`;

//update user - PUT
export const UPDATE_USER = `${path}/user`;

//update agent - PUT
export const UPDATE_AGENT_PROFILE = `${path}/agents`;

//update user password - PUT
export const UPDATE_USER_PASSWORD = `${path}/users`;

//forgot password - PATCH
export const FORGOT_PASSWORD = `${path}/user/password`;

//update user password - PATCH
export const RESET_PASSWORD = `${path}/user/token`;

/////PARAMETERS//////////
//Get list of banks - GET
export const FETCH_BANKS = `${path}/parameters/banks`;

//Get list of states - GET
export const FETCH_STATES = `${path}/parameters/states`;

//Get list of local governments - GET
export const FETCH_LGAS = `${path}/parameters/cities`;

///////AGENT DASHBOARD DATA/////////
export const AGENT_DASHBOARD_DATA = `${path}/agent/dashboard-data`;

//////AGENT INFO///////

//get agent transaction log
export const GET_AGENT_INFO = `${path}/agents/info`;

//////TERMINALS///////

//list terminals - GET
export const LIST_TERMINALS = `${path}/terminals`;

//add terminal - POST
export const ADD_TERMINAL = `${path}/terminals`;

//update terminal - PATCH
export const UPDATE_TERMINAL = `${path}/terminals/id`;

//assign terminal - PUT
export const ASSIGN_TERMINAL = `${path}/terminals`;

//unassign terminal - DELETE
export const UNASSIGN_TERMINAL = `${path}/terminals`;

//initialize agent activation - PUT
export const INITIALIZE_AGENT_ACTIVATION = `${path}/terminals/agents/initialize`;

//activate agent - PUT
export const ACTIVATE_AGENT = `${path}/terminals/agents/activate`;

//search terminals - GET
export const SEARCH_TERMINALS = `${path}/terminals/search`;

/////WALLETS//////

//get wallet history - GET
export const GET_AGENT_WALLET_HISTORY = `${path}/agents/wallets`;

//get wallet logs - GET
export const ALL_WALLET_LOGS = `${path}/wallets/all`;

//post fund agent wallet - POST
export const FUND_AGENT_WALLET = `${path}/wallets/admin`;

///debit agent wallet (admin) - PUT
export const DEBIT_AGENT_WALLET = `${path}/wallets/admin`;

//search wallet
export const SEARCH_WALLET = `${path}/wallets/search`;

//agent wallet transfer
export const WALLET_TRANSFER = `${path}/wallets/transfer`;

//agent wallet transfer
export const VALIDATE_AGENT = `${path}/agents/validate`;

//agent fund wallet request
export const FUND_WALLET_REQUEST = `${path}/fund-requests`;

/////TRANSACTIONS/////

//get agent transaction history - GET
export const AGENT_TRANSACTION_HISTORY = `${path}/transactions`;

//post initiate cashout - POST
export const INITIATE_CASHOUT = `${path}/transactions/cashless`;

///coral pay webhook - POST
export const CORAL_PAY_WEBHOOK = `${path}/transactions/coral`;

//search transctions - GET
export const SEARCH_TRANSACTIONS = `${path}/transactions/search`;

//activity - GET
export const ACTIVITY_LOGS = `${path}/logs`;

/////SERVICES/////////

/////AIRTIME & DATA///////
//get list of telcos - GET
export const GET_TELCOS = `${path}/airtime/telcos`;

//get data plans - POST
export const GET_DATA_PLANS = `${path}/fusion/topup/data/bundles`;

//vend data - POST
export const VEND_DATA = `${path}/fusion/topup/data`;

//vend airtime - POST
export const VEND_AIRTIME = `${path}/fusion/topup/airtime`;

/////CABLE TV//////////
//Validate multichoice smart card number
export const VALIDATE_MULTICHOICE_CUSTOMER = `${path}/cabletv/validate/multichoice`;

//get cable plans
export const GET_CABLE_PLANS = `${path}/cabletv/bouquets`;

//get startimes plans - GET
export const GET_STARTIMES_PLANS = `${path}/cable/multichoice/startimes`;

//validate startimes customer - POST
export const VALIDATE_STARTIMES_CUSTOMER = `${path}/cabletv/validate/startimes`;

//vend startimes - POST
export const VEND_STARTIMES = `${path}/cabletv/subscribe/startimes`;

//get dstv plans - POST
export const GET_DSTV_PLANS = `${path}/cable/multichoice/dstv`;

//get gotv plans - POST
export const GET_GOTV_PLANS = `${path}/cable/multichoice/gotv`;

//vend gotv - POST
export const VEND_MULTICHOICE = `${path}/cabletv/subscribe/multichoice`;

//////BANK OPERATIONS///////

//get list of banks - GET
export const GET_BANK_LIST = `${path}/banks/lists`;

//verify account - GET
export const VERIFY_ACCOUNT = `${path}/recipient/verify`;

//disburse funds -- POST
export const DISBURSE_FUNDS = `${path}/funds/transfer`;

///////ENERGY//////////////////

//get energy vendors - GET
export const GET_ENERGY_VENDORS = `${path}/energy/discos`;

//validate meter number - PUT
export const VALIDATE_METER_NUMBER = `${path}/electricity/validate`;

//vend energy - POST
export const VEND_ENERGY = `${path}/electricity/vend`;

//////////CASHCALL///////////

//Initiate cashcall
export const INITIATE_LIQUID_CASHCALL = `${path}/cashcall/initiate`;

//Post opportunity
export const POST_OPPORTUNITY = `${path}/cashcall/request`;

//Get cashcall list
export const GET_CASHCALL_LIST = `${path}/cashcall`;

//cash call
export const INITIATE_PHYSICAL_CASHCALL = `${path}/cashcall/initiate-accept`;

//Accept cash
export const ACCEPT_OPPORTUNITY = `${path}/cashcall/accept`;

//Release funds
export const RELEASE_FUNDS = `${path}/cashcall/release-funds`;

//Cancel cashcall
export const CANCEL_CASHCALL = `${path}/cashcall/cancel-funds`;

//List opportunities
export const OPPORTUNITIES_LIST = `${path}/cashcall/opportunities`;

////AGGREGATOR - SUPER AGENTS

//Get aggregator dashboard
export const AGGREGATOR_DASHBOARD = `${path}/super-agents/dashboard`;

//Get sub agents list
export const GET_SUB_AGENTS = `${path}/super-agents/agents`;

//Get agent commission history
export const GET_COMMISSION_HISTORY = `${path}/super-agents/commissions`;

//Create agents - POST
export const CREATE_AGENT = `${path}/super-agents/agents/create`;

//Agent registration - POST
export const REGISTER_AGENT = `${path}/users/register`;

//List sub users - GET
export const LIST_USERS = `${path}/agents/subs`;

//Delete sub user - DEL
export const DELETE_USER = `${path}/agents/subs`;

///////////BETTING////////////
//place bet - POST
export const PLACE_BET = `${path}/fusion/events/placebet`;

//list supported banks - GET
export const LIST_SUPPORTED_BANKS = `${path}/fusion/banks`;

//bank details - POST
export const BANK_DETAILS = `${path}/fusion/banks/details`;

//fetch betslip - POST
export const FETCH_BETSLIP = `${path}/fusion/events/slip`;

//bank verification details - POST
export const BANK_VERIFICATION = `${path}/fusion/banks/account/verify`;

//list events - POST
export const LIST_EVENTS = `${path}/fusion/events`;

//fund wallet - POST
export const FUND_BETTING_WALLET = `${path}/fusion/transactions/deposit`;

//requery - GET
export const REQUERY = `${path}/fusion/transactions/requery/CiCO_RKGWBF8NE4ST326`;

//change transaction pin - POST
export const SET_PIN = `${path}/agents/settings/pin`;

//////////LOAN////////////

//loan history
export const LOAN_HISTORY =
  "https://loanserve.cicoserve.xyz/api/v1/loans/history";

//loan repayment history
export const REPAYMENT_HISTORY =
  "https://loanserve.cicoserve.xyz/api/v1/loans/repayments";

//agents info
export const AGENTS_INFO = "https://loanserve.cicoserve.xyz/api/v1/info";

//check loan eligibility
export const CHECK_ELIGIBILITY =
  "https://loanserve.cicoserve.xyz/api/v1/loans/eligibility";

//application
export const LOAN_APPLICATION =
  "https://loanserve.cicoserve.xyz/api/v1/loans/apply";

//requery transactions
export const REQUERY_TRANSACTION_STATUS = `${path}/transactions/verify`;
