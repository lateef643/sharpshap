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

//update user - PUT
export const UPDATE_USER = `${path}/user`;

//update user password - PUT
export const UPDATE_USER_PASSWORD = `${path}/users`;

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
export const WALLET_HISTORY = `${path}/wallets/admin`;

//get wallet logs - GET
export const ALL_WALLET_LOGS = `${path}/wallets/all`;

//post fund agent wallet - POST
export const FUND_AGENT_WALLET = `${path}/wallets/admin`;

///debit agent wallet (admin) - PUT
export const DEBIT_AGENT_WALLET = `${path}/wallets/admin`;

//search wallet
export const SEARCH_WALLET = `${path}/wallets/search`;

/////TRANSACTIONS/////

//get agent transaction history - GET
export const AGENT_TRANSACTION_HISTORY = `${path}/transactions`;

//get transaction logs - GET
export const ALL_TRANSACTION_LOGS = `${path}/transactions/all`;

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
export const GET_DATA_PLANS = `${path}/airtime/data/plans`;

//vend airtime - POST
export const VEND_AIRTIME = `${path}/airtime`;

//vend data - POST
export const VEND_DATA = `${path}/airtime/data`;

/////CABLE TV//////////
//get startimes plans - POST
export const GET_STARTIMES_PLANS = `${path}/airtime/data`;

//validate startimes customer - POST
export const VALIDATE_STARTIMES_CUSTOMER =  `${path}/cable/startimes/validate`;

//vend startimes - POST
export const VEND_STARTIMES =  `${path}/cable/startimes/vend`;

//get dstv plans - POST
export const GET_DSTV_PLANS =  `${path}/cable/multichoice/dstv`;

//validate dstv & gotv customer - POST
export const VALIDATE_MULTICHOICE_CUSTOMER = `${path}/cable/multichoice/validate`;

//get gotv plans - POST
export const GET_GOTV_PLANS = `${path}/cable/multichoice/gotv`;

//vend gotv - POST
export const VEND_MULTICHOICE = `${path}/cable/multichoice/vend`;

//////BANK OPERATIONS///////

//get list of banks - GET
export const GET_BANK_LIST = `${path}/bank-operations/banks`;

//verify account - GET
export const VERIFY_ACCOUNT = `${path}/bank-operations/verify-account`;

//disburse funds -- POST
export const DISBURSE_FUNDS = `${path}/bank-operations/disburse-fund`;
