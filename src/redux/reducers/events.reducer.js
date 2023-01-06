import { combineReducers } from "redux";

const allEvents = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_EVENTS': return action.payload;
    default: return state;
  }
}

// Used when building a new event
const eventToSubmit = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EVENT_TO_SUBMIT': return action.payload;
    case 'CLEAR_EVENT_TO_SUBMIT': return {};
    default: return state;
  }
}
const eventEditId = (state = 0, action) => {
  switch (action.type) {
    case 'SET_ID_OF_EDITED_EVENT': return action.payload;
    case 'CLEAR_ID_OF_EDITED_EVENT': return 0;
    default: return state;
  }
}

export default combineReducers({
  eventEditId,
  allEvents,
  eventToSubmit
});