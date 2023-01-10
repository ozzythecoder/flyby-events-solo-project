import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Swal from 'sweetalert2';
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

  const handleGuestDelete = (name, guest_id) => {
    Swal.fire({
      title: `Delete ${name} from event guest list?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Delete Guest'
    }).then(result => {
      if (result.isConfirmed) {
        deleteGuest(guest_id);
        Swal.fire('Guest deleted.');
      }
    })
  }

  const deleteGuest = (guest_id) => {
    console.log('deleting guest with id', guest_id)
    console.log('from event with id', event.id)

    dispatch({
      type: 'DELETE_GUEST',
      payload: {
        guest_id: guest_id,
        event_id: event.id
      }
    })
  }

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