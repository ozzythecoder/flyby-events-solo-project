import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import EventForm from "../EventForm/EventForm";

export default function EditEvent() {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const thisEvent = (useSelector((store) =>
    store.events.allEvents.filter((el) => el.id == eventId)[0]
  ))

  console.log('thisEvent', thisEvent)

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_EVENTS" })
    dispatch({ type: 'SET_ID_OF_EDITED_EVENT', payload: eventId })
    dispatch({ type: 'SET_EVENT_TO_SUBMIT', payload: thisEvent })
  }, []);

  return (
    <div>
      <h1>Edit Event</h1>
      <EventForm eventId={eventId} goNext={"/editPreview"} />
    </div>
  );
}
