import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, CardContent, Typography } from "@mui/material";

export default function AllEvents() {
  const dispatch = useDispatch();

  const myEvents = useSelector((store) => store.myEvents);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_EVENTS" });
    dispatch({ type: "FETCH_MY_EVENTS" });
  }, []);

  const statuses = {
    "pending": "Pending Invitation",
    "added": "",
    "subscribed": "Subscribed",
  };

  return (
    <div>
      <Typography variant="h4" sx={{ m: 2 }}>
        My Events
      </Typography>
      <div>
        {myEvents.map((event, index) => {
          return (
            <div key={index}>
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
    </div>
  );
}
