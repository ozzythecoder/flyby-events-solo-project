import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function AllEvents() {
  const dispatch = useDispatch();

  const myEvents = useSelector((store) => store.myEvents);

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
                <b>{event.name}</b>
              </p>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}