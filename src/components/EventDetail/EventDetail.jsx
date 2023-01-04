import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function EventDetail() {

  const { eventID } = useParams();

  return (
    <div>
      In page for event ID {eventID}
    </div>
  )
}