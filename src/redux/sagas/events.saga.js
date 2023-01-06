import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects'

function* fetchAllEvents() {
  try {
    const events = yield axios.get('api/events/allEvents')
    yield put({ type: 'SET_ALL_EVENTS', payload: events.data })
  } catch (error) {
    console.log('Error fetching all events', error);
  }
}

function* fetchMyEvents() {
  try {
    const myEvents = yield axios.get('/api/events/eventsByGuest')
    yield put({ type: 'SET_MY_EVENTS', payload: myEvents.data })
  } catch (error) {
    console.log('Error fetching events', error)
  }
}

function* addNewEvent(action) {
  try {
    yield axios.post('/api/events/createEvent', action.payload)
    yield put({ type: 'FETCH_ALL_EVENTS' })
  } catch (error) {
    console.log('Error posting new event')

    // ⚠️ ALERT USER
  }
}

function* editEvent(action) {
  try {
    yield axios.put('/api/events/editEvent', action.payload)
    yield put({ type: 'FETCH_ALL_EVENTS'})
  } catch (error) {
    console.log('Error editing event', error)

    
    // ⚠️ ALERT USER
  }
}

function* eventsSaga() {
  yield takeLatest('FETCH_ALL_EVENTS', fetchAllEvents)
  yield takeLatest('FETCH_MY_EVENTS', fetchMyEvents)

  yield takeLatest('ADD_NEW_EVENT', addNewEvent)
  
  yield takeLatest('EDIT_EVENT', editEvent)
}

export default eventsSaga;