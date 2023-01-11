import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Typography } from "@mui/material";

import EventForm from "../EventForm/EventForm";

export default function CreateEvent() {
  const dispatch = useDispatch();

  return (
    <>
      <EventForm goNext={'/createEvent/preview'} title={'Create Event'} />
    </>
  );
}
