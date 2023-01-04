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

function* eventsSaga() {
  yield takeLatest('FETCH_ALL_EVENTS', fetchAllEvents)
  yield takeLatest('FETCH_MY_EVENTS', fetchMyEvents)
}

export default eventsSaga;