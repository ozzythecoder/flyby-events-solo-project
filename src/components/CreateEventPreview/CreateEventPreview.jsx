import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CreateEventPreview() {

  const history = useHistory();
  const dispatch = useDispatch();

  const { eventToSubmit } = useSelector((store) => store.events);

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
      <h1>Event Preview</h1>
      <p>Event Title: {eventToSubmit.name}</p>
      <p>Date: {eventToSubmit.date}</p>
      <p>Time: {eventToSubmit.time}</p>
      <p>Location: {eventToSubmit.location}</p>
      <p>Description: {eventToSubmit.description}</p>
      <p>Ticket Link: {eventToSubmit.ticket_link || 'None'}</p>
      <p>Visibility: {eventToSubmit.visible ? 'Public Event' : 'Private Event'}</p>

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
