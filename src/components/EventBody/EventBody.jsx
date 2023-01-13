import { Box, Typography } from "@mui/material";

import { formatDate, formatTime } from "../../helpers/dateFormat";
import capitalize from "../../helpers/capitalizeWord";

export default function EventBody({ event, userGuestState = "" }) {
  const ticketLink = event.ticket_link ? (
    <a href={event.ticket_link}>{event.ticket_link}</a>
  ) : (
    ""
  );

  return (
    <div style={{ position: "relative" }}>
      <Typography variant="h3">{event.name}</Typography>
      <Typography
        variant="subheading"
        sx={{ position: "absolute", top: 2, right: 6 }}
      >
        {capitalize(userGuestState)}
      </Typography>
      <Typography variant="subheading" sx={{ mb: 1 }}>
        {!event.visible && "This is a private event."}
      </Typography>
      <Box>
        <Typography variant="body1" fontWeight="bold">
          &#64; {event.location}
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight="bold">
        {formatDate(event.date)} at {formatTime(event.time)}
      </Typography>
      <Typography variant="bodyLink">{ticketLink}</Typography>
      <Box sx={{ mt: 0.5, mb: 3 }}>
        <Typography variant="subheading">Description:</Typography>
        <Typography variant="body1">{event.description}</Typography>
      </Box>
    </div>
  );
}
