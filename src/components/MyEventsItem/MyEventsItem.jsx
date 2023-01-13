import { Box, Container, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { formatDate, formatTime, formatDateMD } from "../../helpers/dateFormat";

export default function MyEventsItem({ event }) {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <a href={`/#/event/${event.id}`}>
        <Card sx={{ m: 2, position: "relative" }} variant="outlined">
          <CardContent>
            <Typography variant="h3">{event.name}</Typography>
            <Typography variant="subheading">
              {user.id === event.host_id && "You are hosting this event"}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {formatDateMD(event.date)} @ {event.location}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, overflowWrap: 'break-word' }}>
              {event.description}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </div>
  );
}
