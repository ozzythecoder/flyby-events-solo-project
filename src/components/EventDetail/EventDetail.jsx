import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
      <button onClick={() => window.history.back()}>
        <b>Go Back</b>
      </button>
      {thisEvent.map((event, index) => {
        return <EventDetailItem key={index} event={event} />;
      })}
    </div>
  );
}
