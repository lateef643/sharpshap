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

//search transctions
export const SEARCH_TRANSACTIONS = `${path}/transactions/search`;