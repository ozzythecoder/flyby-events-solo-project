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

function* addEventGuest(action) {
  try {

  } catch (error) {
  }
  
}

function* findGuestByUsername(action) {
  try {
    const guestObj = yield axios.get('/api/events/userByUsername',
    { params: { username: action.payload } })

    const guestId = guestObj.data[0].id

  } catch (error) {
    console.log(error);
  }
}

function* guestsSaga() {
  yield takeLatest('FETCH_EVENT_GUESTS', fetchEventGuests)
  yield takeLatest('FIND_GUEST_BY_USERNAME', findGuestByUsername)
  yield takeLatest('ADD_EVENT_GUEST', addEventGuest)
}

export default guestsSaga;