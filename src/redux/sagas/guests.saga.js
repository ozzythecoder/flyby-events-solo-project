// Used to get guest list for a given event

import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects'

function* fetchEventGuests(action) {
  try {
    const guests = yield axios.get('/api/events/guestsByEvent',
      { params: { event_id: action.payload } })
    yield put({ type: 'SET_EVENT_GUESTS', payload: guests.data })
  } catch (error) {
    console.log('fetchEventGuests saga', error)
  }

}

function* guestsSaga() {
  yield takeLatest('FETCH_EVENT_GUESTS', fetchEventGuests)
}

export default guestsSaga;