import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import EventForm from "../EventForm/EventForm";

export default function EditEvent() {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_EDIT_EVENT", payload: eventId })
    dispatch({ type: 'SET_ID_OF_EDITED_EVENT', payload: eventId })
  }, []);

  return (
    <div>
      <EventForm goNext={"/editPreview"} title={"Edit Event"} />
    </div>
  );
}
