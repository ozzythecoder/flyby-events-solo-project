import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function AllEvents() {
  const dispatch = useDispatch();

  const myEvents = useSelector((store) => store.myEvents);
  const user = useSelector(store => store.user)

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_EVENTS" });
    dispatch({ type: "FETCH_MY_EVENTS" });
  }, []);

  return (
    <div>
      <h2>My Events</h2>
      <div>
        {myEvents.map((event, index) => {
          return (
            <div key={index}>
              <p>
                <a href= {`/#/event/${event.id}`}>

                <b>{event.name}</b></a>

                {user.id === event.host_id && ' - Hosting'}
              </p>
              <p>When: {event.date}</p>
              <p>Where: {event.location}</p>
              <p>Description:<br />{event.description}</p>
            </div>
          );
        })}
      </div>
      <div>

      </div>
    </div>
  );
}