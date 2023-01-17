import { useState } from "react";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import {
  Divider,
  Typography,
  List,
  ListItem,
  Button,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete"

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

    setNewGuest('');
  };

  const handleGuestDelete = (name, guest_id) => {
    Swal.fire({
      title: `Delete ${name} from event guest list?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete Guest",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGuest(guest_id);
      }
    });
  };

  const deleteGuest = (guest_id) => {
    console.log("deleting guest with id", guest_id);
    console.log("from event with id", event.id);

    dispatch({
      type: "DELETE_GUEST",
      payload: {
        guest_id: guest_id,
        event_id: event.id,
      },
    });
  };

  return (
    <div>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h3">Guest List</Typography>

      <label labelfor="newGuest">
        <Stack
         direction="row" justifyContent="space-around"
          sx={{ my: 1 }}
          >
          <TextField
            type="text"
            size="small"
            label="Invite Guest"
            value={newGuestIn}
            onChange={(event) => setNewGuest(event.target.value)}
          />
          <Button
            type="submit"
            variant="outlined"
            onClick={inviteNewGuests}
            startIcon={<SendIcon />}
          >
            Invite
          </Button>
        </Stack>
      </label>

      <List>
        {guests.map((guest, index) => {
          return (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => handleGuestDelete(guest.username, guest.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              {guest.username} - {guest.guest_state}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
