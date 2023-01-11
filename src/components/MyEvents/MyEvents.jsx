import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, CardContent, Typography } from "@mui/material";

import MyEventsItem from "../MyEventsItem/MyEventsItem";
import PageTitle from "../PageTitle/PageTitle";

export default function MyEvents({ stateFilter = "all", title = "My Events" }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  // utility object to filter for events by stateFilter
  const eventFilters = {
    all: () => true,
    pending: (event) => event.guest_state === "pending",
    subscribed: (event) => event.guest_state === "subscribed",
    hosting: (event) => event.host_id === user.id,
  };

  // filter events based on stateFilter
  const myEvents = useSelector((store) =>
    store.events.myEvents.filter(eventFilters[stateFilter])
  );

  useEffect(() => {
    dispatch({ type: "FETCH_MY_EVENTS" });
  }, []);

  return (
    <div>
      <PageTitle title={title} />
      {myEvents.map((event) => (
        <MyEventsItem key={event.id} event={event} />
      ))}
    </div>
  );
}
