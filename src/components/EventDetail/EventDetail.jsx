import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Typography, Box, Fab, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import EventDetailItem from "../EventDetailItem/EventDetailItem";

export default function EventDetail() {
  const dispatch = useDispatch();
  const { eventID } = useParams();

  return (
    <div>
        <a href="/#/myEvents">
          <ArrowBackIcon fontSize="large" />
        </a>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h2">Event Detail</Typography>
          <Box />
        </Box>
      <EventDetailItem eventID={eventID} />
    </div>
  );
}
