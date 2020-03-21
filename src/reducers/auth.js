import { START_REGISTER_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case START_REGISTER_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};

export default auth;