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

function* fetchMyEvents() {
  try {
    const myEvents = yield axios.get('/api/events/byUser')
    yield put({ type: 'SET_MY_EVENTS', payload: myEvents.data })
  } catch (error) {
    console.log('Error fetching events', error)
    alertError('Error fetching events. Please try again later.')
  }
}

function* fetchEventById(action) {
  try {
    const thisEvent = yield axios.get('/api/events/byId', {
      params: {
        eventId: action.payload
      }
    })
    console.log('thisEvent:', thisEvent)
    yield put({ type: 'SET_THIS_EVENT', payload: thisEvent.data })
  } catch (error) {
    console.log('Error fetching event by ID', error)
    alertError('Error fetching events. Please try again later.')
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
    alertError('Error fetching event. Please try again later.')
  }
}

function* addNewEvent(action) {
  try {
    yield axios.post('/api/events/create', action.payload)
    yield put({ type: 'FETCH_MY_EVENTS' })
  } catch (error) {
    console.log('Error posting new event')

    alertError('Error adding new event. Please try again later.')
  }
}

function* editEvent(action) {
  try {
    yield axios.put('/api/events/edit', action.payload)
    yield put({ type: 'FETCH_EVENT_BY_ID', payload: action.payload.event_id })
  } catch (error) {
    console.log('Error editing event', error)
    alertError('Error editing event. Please try again later.')
  }
}

function* deleteEvent(action) {
  try {
    yield axios.delete('/api/events/delete/' + action.payload)
    yield put({ type: 'FETCH_MY_EVENTS' })
  } catch (error) {
    console.log('Error deleting event', error)
    alertError('Error deleting event. Please try again later.')
  }
}

function* eventsSaga() {
  yield takeLatest('FETCH_MY_EVENTS', fetchMyEvents)
  yield takeLatest('FETCH_EVENT_BY_ID', fetchEventById)
  yield takeLatest('FETCH_EDIT_EVENT', fetchEditEvent)

  yield takeLatest('ADD_NEW_EVENT', addNewEvent) 
  yield takeLatest('EDIT_EVENT', editEvent)
  yield takeLatest('DELETE_EVENT', deleteEvent)
}

export default eventsSaga;