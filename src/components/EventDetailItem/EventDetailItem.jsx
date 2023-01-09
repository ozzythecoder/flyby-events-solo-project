import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Card, Typography, Divider, List, ListItem } from "@mui/material";

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
      type: "DELETE_EVENT",
      payload: event.id,
    });
    dispatch({ type: "FETCH_ALL_EVENTS" });
    history.push("/myEvents");
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
      <Card sx={{ m: 2, p: 2 }}>
        {event.visible || hostView || guestView ? (
          <div>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {event.name}
            </Typography>
            <Typography variant="body1">
              {!event.visible && "This is a private event."}
            </Typography>
            <Typography variant="body1">{event.date}</Typography>
            <Typography variant="body1">{event.time}</Typography>
            <Typography variant="body1">{event.location}</Typography>
            <Typography variant="body1">{event.description}</Typography>
            <Typography variant="body1">{event.ticket_link || ""}</Typography>
          </div>
        ) : (
          <>Sorry, you do not have access to this event.</>
        )}
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

        {hostView && (
          <div>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="h6">Guest List</Typography>
            <div>
              <label labelfor="newGuest">
                <Typography variant="body1">
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
                </Typography>
              </label>
            </div>
            <List>
              {guests.map((guest, index) => {
                return (
                  <ListItem key={index}>
                    {guest.username}: {guest.guest_state}
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </Card>
    </div>
  );
}
