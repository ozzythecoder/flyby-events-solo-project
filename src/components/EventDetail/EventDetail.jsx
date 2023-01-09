import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Typography, Box, Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import EventDetailItem from "../EventDetailItem/EventDetailItem";

export default function EventDetail() {
  const dispatch = useDispatch();
  const { eventID } = useParams();

  const thisEvent = useSelector((store) =>
    store.events.allEvents.filter((el) => el.id == eventID)
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_EVENTS" });
  }, []);

  return (
    <div>
      <a href='/#/myEvents'>
        <ArrowBackIcon fontSize="large" />
      </a>

      <Box>
        <Typography variant="h5">Event Detail</Typography>
      </Box>
      {thisEvent.map((event, index) => {
        return <EventDetailItem key={index} event={event} />;
      })}
    </div>
  );
}
