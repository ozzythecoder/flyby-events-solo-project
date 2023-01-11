import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Typography, Box, Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import EventDetailItem from "../EventDetailItem/EventDetailItem";

export default function EventDetail() {
  const dispatch = useDispatch();
  const { eventID } = useParams();


  return (
    <div>
      <Box>
        <a href="/#/myEvents">
          <ArrowBackIcon fontSize="large" />
        </a>

        <Typography variant="h5">Event Detail</Typography>
      </Box>
      <EventDetailItem eventID={eventID} />
    </div>
  );
}
