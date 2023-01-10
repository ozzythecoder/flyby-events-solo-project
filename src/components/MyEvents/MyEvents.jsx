import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, CardContent, Typography } from "@mui/material";

export default function MyEvents({ stateFilter = 'all', title = "My Events", hosting = false}) {
  const dispatch = useDispatch();

  // utility object to filter for certain events
  const eventFilters = {
    all: () => true,
    pending: event => event.guest_state === 'pending',
    subscribed: event => event.guest_state === 'subscribed',
    hosting: event => event.host_id === user.id
  }
  
  const user = useSelector((store) => store.user);
  const myEvents = useSelector(
    store => store.events.myEvents.filter(eventFilters[stateFilter])
  );

  useEffect(() => {
    dispatch({ type: "FETCH_MY_EVENTS" });
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ m: 2 }}>
        {title}
      </Typography>
      <div>
        {myEvents.map((event, index) => {
          return (
            <div key={event.id}>
              <a href={`/#/event/${event.id}`}>
                <Card sx={{ mb: 2, mx: 2 }} variant="outlined">
                  <CardContent>
                    <Typography variant="h5">
                      {event.name}

                      {user.id === event.host_id && " - Hosting"}
                    </Typography>
                    <Typography variant="body1">
                      {/* ⚠️ FORMAT WITH LUXON.JS */}
                      When: {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">
                      Where: {event.location}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </div>
          );
        })}
      </div>
      {/* {JSON.stringify(useSelector(store => store.events.myEvents))} */}
    </div>
  );
}
