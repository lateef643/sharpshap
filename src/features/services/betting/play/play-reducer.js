export const initialState = {
  bets: [],
  provider: "54000",
  amount: "",
  phone: "",
  winnings: "",
  oddsTotal: "",
};

const playReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_BET_DETAILS":
      return { ...state, ...payload };
    case "SET_BETSLIP":
      return { ...state, bets: payload };
    case "ADD_TO_BETSLIP":
      if (
        state.bets.length === 0 ||
        state.bets.findIndex((bet) => bet.match_id === payload.match_id) === -1
      ) {
        return { ...state, bets: [...state.bets, payload] };
      } else if (
        state.bets.findIndex((bet) => bet.match_id === payload.match_id) > -1
      ) {
        return {
          ...state,
          bets: state.bets.map((bet) => {
            if (bet.match_id === payload.match_id) {
              return payload;
            } else {
              return bet;
            }
          }),
        };
      }
      break;
    case "REMOVE_FROM_BETSLIP":
      return {
        ...state,
        bets: state.bets.filter((bet) => {
          return bet.match_id !== payload.match_id;
        }),
      };
    default:
      return state;
  }
};

export default playReducer;
