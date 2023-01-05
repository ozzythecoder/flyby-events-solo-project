import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function EventDetailItem({ event }) {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const hostView = event.hostid !== user.id

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT_GUESTS', payload: event.id })
  }, [])

  return (
    <div>
      <div>{hostView && <p>Can be edited</p>}</div>
      {event.visible ? (
        <div>
          <p>{event.name}</p>
          <p>{event.date}</p>
          <p>{event.time}</p>
          <p>{event.location}</p>
          <p>{event.description}</p>
          <p>{event.ticket_link || "none"}</p>
        </div>
      ) : (
        <>Sorry, you do not have access to this event.</>
      )}
      {hostView && (
        <div>
          <h3>Guest List</h3>

        </div>
      )}
    </div>
  );
}
