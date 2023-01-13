import { Typography } from "@mui/material";

import { formatDate, formatTime } from "../../helpers/dateFormat";

export default function EventBody({ event }) {

  const eventDate = formatDate(event.date);
  const eventTime = formatTime(event.time);

  return (
    <div>
      <Typography variant="h3">
        {event.name}
      </Typography>
      <Typography variant="subheading" sx={{ mb: 1 }}>
        {!event.visible && "This is a private event."}
      </Typography>
      <Typography variant="body1">{eventDate}</Typography>
      <Typography variant="body1">{eventTime}</Typography>
      <Typography variant="body1">{event.location}</Typography>
      <Typography variant="body1">{event.ticket_link || ""}</Typography>
      <Typography variant="body1">{event.description}</Typography>
    </div>
  );
}
