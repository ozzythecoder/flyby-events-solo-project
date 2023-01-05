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

export default combineReducers({
  allEvents,
  eventToSubmit
});