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
    console.log(action.payload)
    yield axios.post('/api/events/addGuest', action.payload)
    yield put({
      type: 'FETCH_EVENT_GUESTS',
      payload: action.payload.event_id
    })
  } catch (error) {
    console.log('addEventGuest saga', error);
    alert('Server error when adding guest.')
  }
  
}

function* findGuestByUsername(action) {
  try {
    const guestObj = yield axios.get('/api/events/userByUsername',
    { params: { username: action.payload.username } })

    const user_id = guestObj.data[0]?.id || null
    console.log('guest ID is', user_id)

    if (user_id !== null) {
      yield put({
        type: 'ADD_EVENT_GUEST',
        payload: {
          user_id: user_id,
          event_id: action.payload.event_id
        }
      })
    } else {
      alert('No user found.')
    }

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