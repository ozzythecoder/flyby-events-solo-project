import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, Typography } from "@mui/material";
import EventGuestList from "../EventGuestList/EventGuestList";
import EventBody from "../EventBody/EventBody";
import EventHostFunctions from "../EventHostFunctions/EventHostFunctions";
import EventGuestFunctions from "../EventGuestFunctions/EventGuestFunctions";

export default function EventDetailItem({ eventID }) {
  const dispatch = useDispatch();

  const event = useSelector((store) => store.events.thisEvent);

  const user = useSelector((store) => store.user);
  const guests = useSelector((store) => store.guests);
  const userGuestState = guests.filter((guest) => guest.id === user.id)[0]
    ?.guest_state;

  // determines visibility of host functions
  const hostView = event.host_id === user.id;

  // determines visibility of private events
  const userIsGuest = guests.some((guest) => guest.id === user.id);

  const eventIsVisible = event.visible || hostView || userIsGuest
  const guestFunctionsAreVisible = userIsGuest || (event.visible && user.id)

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_BY_ID", payload: eventID });
    dispatch({ type: "FETCH_EVENT_GUESTS", payload: eventID });
  }, []);

  return (
    <div>
      <Card sx={{ m: 2, p: 2 }} variant="outlined">
        {eventIsVisible ? (
          <EventBody event={event} userGuestState={userGuestState} />
        ) : (
          <Typography variant="body1">
            Sorry, you do not have access to this private event.
          </Typography>
        )}

        {hostView && (
          <>
            <EventHostFunctions event={event} />
            <EventGuestList event={event} guests={guests} />
          </>
        )}

        {guestFunctionsAreVisible && (
          <EventGuestFunctions event={event} userGuestState={userGuestState} />
        )}

      </Card>
    </div>
  );
}