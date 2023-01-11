import { Typography } from "@mui/material";

export default function EventBody({ event }) {
  return (
    <div>
      <Typography variant="h3" sx={{ mb: 1 }}>
        {event.name}
      </Typography>
      <Typography variant="body1">
        {!event.visible && "This is a private event."}
      </Typography>
      <Typography variant="body1">{event.date}</Typography>
      <Typography variant="body1">{event.time}</Typography>
      <Typography variant="body1">{event.location}</Typography>
      <Typography variant="body1">{event.description}</Typography>
      <Typography variant="body1">{event.ticket_link || ""}</Typography>
    </div>
  );
}
