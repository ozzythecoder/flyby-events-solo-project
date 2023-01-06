import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function EditEventPreview() {
  const dispatch = useDispatch();
  const history = useHistory();

  const event = useSelector((store) => store.events.eventToSubmit);
  const eventId = useSelector(store => store.events.eventEditId)

  const handleConfirm = () => {
    dispatch({
      type: "EDIT_EVENT",
      payload: {...event, event_id: eventId},
    });
    history.push("/event/" + eventId);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const handleCancel = () => {
    dispatch({
      type: "CLEAR_EVENT_TO_SUBMIT",
    });
    history.push("/home");
  };

  return (
    <>
      <h1>Preview Edits</h1>
      <p>{event.name}</p>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <p>{event.location}</p>
      <p>{event.description}</p>
      <p>{event.ticket_link || "No ticket link"}</p>
      <p>{event.visible ? "" : "This is a private event."}</p>

      <button onClick={handleConfirm}>Confirm Edits</button>
      <button onClick={handleGoBack}>Go Back</button>
      <button onClick={handleCancel}>Cancel and Discard</button>
    </>
  );
}
