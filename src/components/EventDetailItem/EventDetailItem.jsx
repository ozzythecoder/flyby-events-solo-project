import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "@mui/material";
import EventGuestList from "../EventGuestList/EventGuestList";
import EventBody from "../EventBody/EventBody";
import EventHostFunctions from "../EventHostFunctions/EventHostFunctions";
import EventGuestFunctions from "../EventGuestFunctions/EventGuestFunctions";

export default function EventDetailItem({ event }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const guests = useSelector((store) => store.guests);
  const userGuestState = guests.filter((guest) => guest.id === user.id)[0]
    ?.guest_state;

  // determines visibility of host functions
  const hostView = event.host_id === user.id;

  // determines visibility of private events
  const guestView = guests.some((guest) => guest.id === user.id);

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_GUESTS", payload: event.id });
  }, []);

  return (
    <div>
      <Card sx={{ m: 2, p: 2 }}>
        {event.visible || hostView || guestView ? (
          <EventBody event={event} />
        ) : (
          <>
            Sorry, you do not have access to this private event.
          </>
        )}

        {hostView && (
          <>
            <EventHostFunctions event={event} />
            <EventGuestList event={event} guests={guests} />
          </>
        )}

        {guestView && (
          <EventGuestFunctions event={event} userGuestState={userGuestState} />
        )}
      </Card>
    </div>
  );
}