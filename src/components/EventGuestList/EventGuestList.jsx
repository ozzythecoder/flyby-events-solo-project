import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Divider,
  Typography,
  List,
  ListItem
} from '@mui/material'


export default function EventGuestList({ event, guests }) {

  const dispatch = useDispatch();

  const [newGuestIn, setNewGuest] = useState("");

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

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_GUESTS", payload: event.id });
  }, []);

  return (
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

              <button
                onClick={() => handleGuestDelete(guest.username, guest.id)}>
                  Delete
              </button>
            </ListItem>
          );
        })}
      </List>
    </div>
  )

}