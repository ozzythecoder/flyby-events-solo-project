import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import EventForm from "../EventForm/EventForm";

export default function EditEvent() {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const thisEvent = useSelector((store) =>
    store.events.allEvents.filter((el) => el.id == eventId)[0]
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_EVENTS" })
  }, []);

  return (
    <div>
      <h1>Edit Event</h1>
      <EventForm goNext={"/editEvent/preview"} />
    </div>
  );
}
