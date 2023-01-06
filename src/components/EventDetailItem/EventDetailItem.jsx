import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function EventDetailItem({ event }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const guests = useSelector((store) => store.guests);

  const [newGuestIn, setNewGuest] = useState("");
  const [deletePrimed, primeForDelete] = useState(false);

  const hostView = event.host_id === user.id;
  const guestView = guests.some((guest) => guest.id === user.id); // allows visibility of private events

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_GUESTS", payload: event.id });
  }, []);

  const editEvent = () => {
    dispatch({
      type: "SET_EVENT_TO_SUBMIT",
      payload: event,
    });
    history.push("/editEvent/" + event.id);
  };

  const handleDelete = () => primeForDelete(true);

  const confirmDelete = () => {
    dispatch({
      type: 'DELETE_EVENT',
      payload: event.id
    })
    history.push('/myEvents')
  };

  const inviteNewGuests = (evt) => {
    evt.preventDefault();

    console.log("inviting new guest", newGuestIn);

    dispatch({
      type: "FIND_GUEST_BY_USERNAME",
      payload: {
        username: newGuestIn,
        event_id: event.id,
      },
    });
  };

  return (
    <div>
      <div>
        {hostView && (
          <p>
            <button onClick={editEvent}>Edit Event</button>
            {deletePrimed ? (
              <button onClick={confirmDelete}>Confirm Delete</button>
            ) : (
              <button onClick={handleDelete}>Delete Event</button>
            )}
          </p>
        )}
      </div>

      {event.visible || hostView || guestView ? (
        <div>
          <h3>{event.name}</h3>
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

      {hostView && (
        <>
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
        </>
      )}
    </div>
  );
}
