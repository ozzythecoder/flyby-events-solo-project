import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import EventDetailItem from "../EventDetailItem/EventDetailItem";

export default function EventDetail() {
  const dispatch = useDispatch();
  const { eventID } = useParams();

  const thisEvent = useSelector((store) =>
    store.events.filter((el) => el.id == eventID)
  );

  useEffect(() => {
    dispatch({ type: "FETCH_MY_EVENTS" });
    dispatch({ type: 'FETCH_EVENT_GUESTS', payload: 7 })
  }, []);

  return (
    <div>
      <p onClick={() => window.history.back()}>
        <b>Go Back</b>
      </p>
      {thisEvent.map((event, index) => {
        return (<EventDetailItem key={index} event={event} />)
      })}
    </div>
  );
}