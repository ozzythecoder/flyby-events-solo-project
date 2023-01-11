import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import EventForm from "../EventForm/EventForm";

export default function CreateEvent() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <EventForm goNext={'/createEvent/preview'} />
  );
}
