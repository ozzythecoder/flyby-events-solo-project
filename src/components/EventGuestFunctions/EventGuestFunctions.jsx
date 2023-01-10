import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Divider } from "@mui/material";

import Swal from "sweetalert2";

export default function EventGuestFunctions({ event, userGuestState }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)

  const editGuestState = (guest_state) => {
    console.log("editing guest", user.id, "to", guest_state);

    const alertTitle = {
      'added': 'Added to your events.',
      'subscribed': 'Subscribed to updates.'
    }

    Swal.fire({
      title: alertTitle[guest_state],
      icon: 'success'
    })

    dispatch({
      type: "EDIT_GUEST_STATE",
      payload: {
        guest_state,
        guest_id: user.id,
        event_id: event.id,
      },
    });
  };

  const handleSubscribe = () => {
    Swal.fire({
      title: "Subscribe to email updates?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "green",
      confirmButtonText: "Subscribe",
    }).then((result) => {
      if (result.isConfirmed) {
        editGuestState('subscribed');
      }
    })
  }

  const handleUnsubscribe = () => {
    Swal.fire({
      title: "Unsubscribe from email updates?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Unsubscribe",
    }).then((result) => {
      if (result.isConfirmed) {
        editGuestState('added');
      }
    })
  }

  const handleSelfDelete = () => {

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
        deleteGuest();
        Swal.fire("Event deleted.");
        history.push("/myEvents");
      }
    });
  };

  const deleteGuest = () => {
    console.log("deleting guest with id", user.id);
    console.log("from event with id", event.id);

    dispatch({
      type: "DELETE_GUEST",
      payload: {
        guest_id: user.id,
        event_id: event.id,
      },
    });
  };

  const displayButtons = {
    pending: (
      <>
        You have been invited to this private event. Accept?
        <button onClick={() => { editGuestState("added") }} >
          Accept
        </button>
        <button onClick={() => { handleSelfDelete() }} >
          Decline
        </button>
      </>
    ),
    added: (
      <>
        <button onClick={() => { handleSubscribe() }} >
          Subscribe to Updates
        </button>
        <button onClick={() => { handleSelfDelete() }} >
          Remove Event
        </button>
      </>
    ),
    subscribed: (
      <>
        You're subscribed to updates from this event.
        <button onClick={() => { handleUnsubscribe() }} >
          Unsubscribe
        </button>
        <button onClick={() => { handleSelfDelete() }} >
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
