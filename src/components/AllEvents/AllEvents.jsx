import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function AllEvents() {

  const dispatch = useDispatch();

  const allEvents = useSelector(store => store.events)

  console.log(allEvents)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_EVENTS' })
  }, [])

  return (
    <div>

    </div>
  )
}