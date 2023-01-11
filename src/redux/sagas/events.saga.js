import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects'

import Swal from 'sweetalert2'

function alertError(error) {
  Swal.fire({
    title: 'Error',
    text: error,
    icon: 'error'
  })
}

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

function* fetchEventById(action) {
  try {
    const thisEvent = yield axios.get('/api/events/eventById', {
      params: {
        eventId: action.payload
      }
    })
    yield put({ type: 'SET_THIS_EVENT', payload: thisEvent.data[0] })
  } catch (error) {
    console.log(error)
    alertError(error)
  }
}

function* fetchEditEvent(action) {
  try {
    const thisEvent = yield axios.get('/api/events/eventById', {
      params: {
        eventId: action.payload
      }
    })
    yield put({ type: 'SET_EVENT_TO_SUBMIT', payload: thisEvent.data[0] })
  } catch (error) {
    console.log('fetchEditEvent', error);
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

function* deleteEvent(action) {
  try {
    yield axios.delete('/api/events/deleteEvent/' + action.payload)
    yield put({ type: 'FETCH_ALL_EVENTS' })
  } catch (error) {
    console.log('Error deleting event', error)

    // ⚠️ ALERT USER
  }
}

function* eventsSaga() {
  yield takeLatest('FETCH_ALL_EVENTS', fetchAllEvents)
  yield takeLatest('FETCH_MY_EVENTS', fetchMyEvents)
  yield takeLatest('FETCH_EVENT_BY_ID', fetchEventById)
  yield takeLatest('FETCH_EDIT_EVENT', fetchEditEvent)

  yield takeLatest('ADD_NEW_EVENT', addNewEvent) 
  yield takeLatest('EDIT_EVENT', editEvent)
  yield takeLatest('DELETE_EVENT', deleteEvent)
}

export default eventsSaga;