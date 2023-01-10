import { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";

export default function EventHostFunctions({ event }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const editEvent = () => {
    dispatch({
      type: "SET_EVENT_TO_SUBMIT",
      payload: event,
    });
    history.push("/editEvent/" + event.id);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Permanently delete your event?",
      text: "This can't be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete Event",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEvent();
        Swal.fire("Event deleted.");
        history.push("/myEvents");
      }
    });
  }

  const deleteEvent = () => {
    dispatch({
      type: "DELETE_EVENT",
      payload: event.id,
    });
    dispatch({ type: "FETCH_ALL_EVENTS" });
  }

  return (
    <div>
      <p>
        <button onClick={editEvent}>Edit Event</button>
        <button onClick={handleDelete}>Delete Event</button>
      </p>
    </div>
  )
}