import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function AllEvents() {

  const dispatch = useDispatch();

  const allEvents = useSelector(store => store.myEvents)

  useEffect(() => {
    dispatch({ type: 'FETCH_MY_EVENTS' })
  }, [])

  return (
    <div>
      { allEvents.map(event => {
        return (
          <div>
            <p><b>{event.name}</b></p>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
          </div>
        )
      }) }
    </div>
  )
}