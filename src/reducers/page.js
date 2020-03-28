const pageReducer = (state = {
  page: 'dashboard',
  heading: 'Services',
  input: true
}, action) => {
  switch(action.type) {
    case 'SET_CURRENT_PAGE':
      return action.payload;
    default: 
      return state;
  }
};

export default pageReducer;