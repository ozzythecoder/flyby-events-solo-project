import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import { Card, Typography, Divider } from "@mui/material";
import EventGuestList from "../EventGuestList/EventGuestList";
import EventBody from "../EventBody/EventBody";
import EventHostFunctions from "../EventHostFunctions/EventHostFunctions";

export default function EventDetailItem({ event }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const guests = useSelector((store) => store.guests);

  const hostView = event.host_id === user.id;
  const guestView = guests.some((guest) => guest.id === user.id); // allows visibility of private events

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_GUESTS", payload: event.id });
  }, []);


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

  return (
    <div>
      <Card sx={{ m: 2, p: 2 }}>
        {event.visible || hostView || guestView ? (
          <EventBody event={event} />
        ) : (
          <>Sorry, you do not have access to this private event.</>
        )}

        {hostView && <EventHostFunctions event={event} /> }

        {hostView && <EventGuestList event={event} guests={guests} />}

        {/* ⚠️ GUEST FUNCTIONS */}
      </Card>
    </div>
  );
}
