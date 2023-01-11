import { combineReducers } from "redux";

const eventObj = {
  name: '',
  date: '',
  time: '',
  location: '',
  description: '',
  ticket_link: '',
  visible: false
}

const allEvents = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_EVENTS': return action.payload;
    default: return state;
  }
}

const thisEvent = (state = eventObj, action) => {
  switch (action.type) {
    case 'SET_THIS_EVENT' : return action.payload;
    default: return state;
  }
}

// Used when building a new event or editing an existing one
const eventToSubmit = (state = eventObj, action) => {
  switch (action.type) {
    case 'SET_EVENT_TO_SUBMIT': return action.payload;
    case 'CLEAR_EVENT_TO_SUBMIT': return eventObj;
    default: return state;
  }
}

const myEvents = (state = [], action) => {
  switch (action.type) {
    case 'SET_MY_EVENTS': return action.payload;
    default: return state;
  }
}

const eventEditId = (state = null, action) => {
  switch (action.type) {
    case 'SET_ID_OF_EDITED_EVENT': return action.payload;
    case 'CLEAR_ID_OF_EDITED_EVENT': return null;
    default: return state;
  }
}

export default combineReducers({
  myEvents,
  thisEvent,
  eventEditId,
  allEvents,
  eventToSubmit
});