const guestsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_EVENT_GUESTS': return action.payload;
    default: return state;
  }
}

export default guestsReducer;