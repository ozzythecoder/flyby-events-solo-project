import { Typography } from "@mui/material";
import { DateTime } from "luxon";


export default function EventBody({ event }) {

  const date =
    DateTime.fromISO(event.date)
      .toLocaleString(DateTime.DATE_FULL)

  const time = DateTime.fromISO(event.time)
    .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET)


  return (
    <div>
      <Typography variant="h3">
        {event.name}
      </Typography>
      <Typography variant="subheading" sx={{ mb: 1 }}>
        {!event.visible && "This is a private event."}
      </Typography>
      <Typography variant="body1">{date}</Typography>
      <Typography variant="body1">{time}</Typography>
      <Typography variant="body1">{event.location}</Typography>
      <Typography variant="body1">{event.ticket_link || ""}</Typography>
      <Typography variant="body1">{event.description}</Typography>
    </div>
  );
}
