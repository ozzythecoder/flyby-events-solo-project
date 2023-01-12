import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import PageTitle from "../PageTitle/PageTitle";
import EventBody from "../EventBody/EventBody";

import { Card } from "@mui/material";

export default function CreateEventPreview() {

  const history = useHistory();
  const dispatch = useDispatch();

  const event = useSelector((store) => store.events.eventToSubmit);

  const createEvent = () => {
    dispatch({ type: 'ADD_NEW_EVENT', payload: eventToSubmit })
    dispatch({ type: 'FETCH_MY_EVENTS' })
    history.push('/myEvents')
  }

  const goBack = () => { history.goBack(); }

  const handleCancel = () => {
    dispatch({ type: 'CLEAR_EVENT_TO_SUBMIT' })
    history.push('/myEvents')
  }

  return (
    <div>

      <PageTitle title="Preview New Event" />
      <Card sx={{ m: 2, p: 2}}>
        <EventBody event={event} />
      </Card>

      {/* <h1>Event Preview</h1>
      <p>Event Title: {eventToSubmit.name}</p>
      <p>Date: {eventToSubmit.date}</p>
      <p>Time: {eventToSubmit.time}</p>
      <p>Location: {eventToSubmit.location}</p>
      <p>Description: {eventToSubmit.description}</p>
      <p>Ticket Link: {eventToSubmit.ticket_link || 'None'}</p>
      <p>Visibility: {eventToSubmit.visible ? 'Public Event' : 'Private Event'}</p> */}

      <button onClick={createEvent}>
        Create Event
      </button>
      <button onClick={goBack}>
        Go Back
      </button>
      <button onClick={handleCancel}>
        Cancel and Discard
      </button>
    </div>
  );
}
