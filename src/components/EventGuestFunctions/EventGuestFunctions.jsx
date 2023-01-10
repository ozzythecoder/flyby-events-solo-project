import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";

export default function EventGuestFunctions({ event }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)

  const userGuestState = guests.filter((guest) => guest.id === user.id)[0]
    ?.guest_state;

  const editGuestState = (guest_id, guest_state) => {
    console.log("editing guest", guest_id, "to", guest_state);

    dispatch({
      type: "EDIT_GUEST_STATE",
      payload: {
        guest_state,
        guest_id,
        event_id: event.id,
      },
    });
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
        subscribeGuest();
        Swal.fire({
          title: "Subscribed!",
          text: "You'll receive email updates if the event changes."
        });
      }
    })
  }

  const subscribeGuest = () => {

  }

  const handleSelfDelete = (guest_id) => {
    Swal.fire({
      title: "Delete private invite?",
      text: "This can't be undone.",
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
    )
  };

  return (
  <div>
    {displayButtons[userGuestState]}
  </div>
  );
}
