import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { Typography, Box, Fab, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import EventDetailItem from "../EventDetailItem/EventDetailItem";
import PageTitle from "../PageTitle/PageTitle";

export default function EventDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventID } = useParams();

  return (
    <div>

        <IconButton
            edge="start"
            onClick={() => history.push('/myEvents')}
            sx={{ 
              position: "absolute",
              m: 0.5,
              color: "black" }}
          >
            <ArrowBackIcon fontSize='large' />
          </IconButton>

        <PageTitle title={'Event Detail'} />

      <EventDetailItem eventID={eventID} />
    </div>
  );
}
