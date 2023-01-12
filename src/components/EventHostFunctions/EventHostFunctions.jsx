import { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "@mui/material";

import Swal from "sweetalert2";
import { Stack } from "@mui/system";

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
      <Stack
        direction="row"
        justifyContent="space-evenly"
        sx={{ my: 2 }}
      >
        <Button variant="outlined" color="primary" onClick={editEvent}>Edit Event</Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>Delete Event</Button>
      </Stack>
    </div>
  )
}