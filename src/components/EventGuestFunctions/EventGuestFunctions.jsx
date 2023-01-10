import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Divider } from "@mui/material";

import Swal from "sweetalert2";

export default function EventGuestFunctions({ event, userGuestState }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)

  const editGuestState = (guest_id, guest_state) => {
    console.log("editing guest", guest_id, "to", guest_state);

    const alertTitle = {
      'added': 'Added to your events.',
      'subscribed': 'Subscribed to updates.'
    }

    Swal.fire({
      title: alertTitle[guest_state],
      icon: 'success'
    })

    // dispatch({
    //   type: "EDIT_GUEST_STATE",
    //   payload: {
    //     guest_state,
    //     guest_id,
    //     event_id: event.id,
    //   },
    // });
  };

  const handleSubscribe = () => {
    Swal.fire({
      title: "Subscribe to email updates?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete Invite",
    }).then((result) => {
      if (result.isConfirmed) {
        editGuestState(guest_id, 'subscribed');
      }
    })
  }

  const handleSelfDelete = (guest_id) => {

    const alertText = {
      true: "It will be removed from your My Events page.",
      false: "You will permanently lose access to event details and subscriptions."
    }

    Swal.fire({
      title: "Delete invite?",
      text: alertText[JSON.stringify(event.visible)],
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete Invite",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGuest(guest_id);
        Swal.fire("Event deleted.");
        history.push("/myEvents");
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

  const displayButtons = {
    pending: (
      <>
        You have been invited to this private event. Accept?
        <button
          onClick={() => {
            editGuestState(user.id, "added");
          }}
        >
          Accept
        </button>
        <button
          onClick={() => {
            handleSelfDelete(user.id);
          }}
        >
          Decline
        </button>
      </>
    ),
    added: (
      <>
        <button
          onClick={() => {
            handleSelfDelete(user.id);
          }}
        >
          Subscribe to Updates
        </button>
        <button
          onClick={() => {
            handleSelfDelete(user.id);
          }}
        >
          Remove Event
        </button>
      </>
    ),
    subscribed: (
      <>
        You're subscribed to updates from this event.
        <button>
          Unsubscribe
        </button>
        <button
          onClick={() => {
            handleSelfDelete(user.id);
          }}
        >
          Remove Event
        </button>
      </>
    )
  };

  return (
  <div>
    <Divider sx={{ my: 1 }} />
    {displayButtons[userGuestState]}
  </div>
  );
}
