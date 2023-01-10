import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import { Card, Typography, Divider } from "@mui/material";
import EventGuestList from "../EventGuestList/EventGuestList";
import EventBody from "../EventBody/EventBody";

export default function EventDetailItem({ event }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const guests = useSelector((store) => store.guests);

  const [deletePrimed, primeForDelete] = useState(false);

  const hostView = event.host_id === user.id;
  const guestView = guests.some((guest) => guest.id === user.id); // allows visibility of private events
  const userGuestState = guests.filter((guest) => guest.id === user.id)[0]
    ?.guest_state;

  const editEvent = () => {
    dispatch({
      type: "SET_EVENT_TO_SUBMIT",
      payload: event,
    });
    history.push("/editEvent/" + event.id);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_GUESTS", payload: event.id });
  }, []);

  const handleDelete = () => primeForDelete(true);

  const confirmDelete = () => {
    dispatch({
      type: "DELETE_EVENT",
      payload: event.id,
    });
    dispatch({ type: "FETCH_ALL_EVENTS" });
    history.push("/myEvents");
  };

  const editGuestState = (guest_id, guest_state) => {
    console.log("editing guest", guest_id, "to", guest_state);

    dispatch({
      type: "EDIT_GUEST_STATE",
      payload: {
        guest_state,
        guest_id,
        event_id: event.id,
      },
    });
  };

  const handleSelfDelete = (guest_id) => {
    Swal.fire({
      title: "Delete private invite?",
      text: "This can't be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete Invite",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGuest(guest_id);
        Swal.fire("Event deleted.");
        history.push("/myEvents");
      }
    });
  };

  return (
    <div>
      <Card sx={{ m: 2, p: 2 }}>
        {event.visible || hostView || guestView ? (
          <EventBody event={event} />
        ) : (
          <>Sorry, you do not have access to this event.</>
        )}
        {hostView && (
          <div>
            <p>
              <button onClick={editEvent}>Edit Event</button>
              {deletePrimed ? (
                <button onClick={confirmDelete}>Confirm Delete</button>
              ) : (
                <button onClick={handleDelete}>Delete Event</button>
              )}
            </p>
          </div>
        )}

        <Divider sx={{ mb: 1 }} />

        {hostView && <EventGuestList event={event} guests={guests} />}

        {guestView && userGuestState == "pending" && (
          <>
            You have been invited to this private event. Accept?
            <button
              onClick={() => {
                editGuestState(user.id, "added");
              }}
            >
              Accept
            </button>
            <button
              onClick={() => {
                handleSelfDelete(user.id);
              }}
            >
              Decline
            </button>
          </>
        )}

        {guestView && (
          <>
            <button
              onClick={() => {
                handleSelfDelete(user.id);
              }}
            >
              Remove Event
            </button>
          </>
        )}
      </Card>
    </div>
  );
}
