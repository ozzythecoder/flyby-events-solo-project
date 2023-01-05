import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function EventDetailItem({ event }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const guests = useSelector((store) => store.guests);

  const [newGuestIn, setNewGuest] = useState("");

  const hostView = event.host_id === user.id;
  const guestView = guests.some((guest) => guest.id === user.id); // allows visibility of private events

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_GUESTS", payload: event.id });
  }, []);

  const editEvent = () => {};

  const deleteEvent = () => {};

  const inviteNewGuests = (evt) => {
    evt.preventDefault();

    console.log('in invitenewguests');

  };

  return (
    <div>
      <div>
        {hostView && (
          <p>
            <button onClick={editEvent}>Edit Event</button>
            <button onClick={deleteEvent}>Delete Event</button>
          </p>
        )}
      </div>

      {event.visible || hostView || guestView ? (
        <div>
          <p>
            <b>Add To Events</b>
          </p>
          <p>{event.name}</p>
          <p>{event.date}</p>
          <p>{event.time}</p>
          <p>{event.location}</p>
          <p>{event.description}</p>
          <p>{event.ticket_link || "none"}</p>
          <p>{event.visible ? "" : "This is a private event."}</p>
        </div>
      ) : (
        <>Sorry, you do not have access to this event.</>
      )}

      <div>
        <label labelfor="newGuest">
          Invite Guest:
          <input
            id="newGuest"
            type="text"
            placeholder="Guest Username"
            value={newGuestIn}
            onChange={(event) => setNewGuest(event.target.value)}
          />
          <button type="submit" onClick={inviteNewGuests}>
            √
          </button>
        </label>
      </div>

      {hostView && (
        <div>
          <h3>Guest List</h3>

          {guests.map((guest, index) => {
            return (
              <div key={index}>
                {guest.username}: {guest.guest_state}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
