import { useSelector } from "react-redux";

export default function EventDetailItem({ event }) {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <div>{event.host_id === user.id && <p>Can be edited</p>}</div>
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
    </div>
  );
}
