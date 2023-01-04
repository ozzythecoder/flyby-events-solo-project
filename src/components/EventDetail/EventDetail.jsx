import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  const dispatch = useDispatch();
  const { eventID } = useParams();

  const thisEvent = useSelector((store) =>
    store.events.filter((el) => el.id == eventID)
  );

  useEffect(() => {
    dispatch({ type: "FETCH_MY_EVENTS" });
  }, []);

  return (
    <div>
      <p onClick={() => window.history.back()}>
        <b>Go Back</b>
      </p>
      {thisEvent.map((event, index) => {
        return event.visible ? (
          <div>
            <p>{event.name}</p>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <p>{event.ticket_link || 'none'}</p>
          </div>
        ) : (<>Sorry, you do not have access to this event.</>)
      })}
    </div>
  );
}