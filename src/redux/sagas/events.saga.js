import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects'

function* fetchAllEvents() {
  try {

    const events = yield axios.get('/allEvents')
    yield put({ type: 'SET_ALL_EVENTS', payload: events })

  } catch (error) {
    console.log('Error fetching all events');
  }

}

function* eventsSaga() {
  yield takeLatest('FETCH_ALL_EVENTS', fetchAllEvents)
}

export default eventsSaga;