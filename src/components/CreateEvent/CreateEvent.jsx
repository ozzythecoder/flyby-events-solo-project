import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CreateEvent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { eventToSubmit } = useSelector(store => store.events)
  
  const [nameIn, setName] = useState(eventToSubmit.name || '');
  const [dateIn, setDate] = useState(eventToSubmit.date || '');
  const [timeIn, setTime] = useState(eventToSubmit.time || '');
  const [locationIn, setLocation] = useState(eventToSubmit.location || '');
  const [descriptionIn, setDescription] = useState(eventToSubmit.description || '');
  const [ticketLinkIn, setTicketLink] = useState(eventToSubmit.ticket_link || '');
  const [visibleIn, setVisible] = useState(eventToSubmit.visible || false);

  const validateInputs = (eventObject) => {

    let {ticket_link, visible, ...eventToValidate} = eventObject

    if (Object.values(eventToValidate).some(value => !value)) {
      console.log('falsy values')
      alert('Please complete all required fields.')

      // ⚠️ ALERT USER

      return false;
    }

    return true;
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    console.log('in handlesubmit')

    const eventObject = {
      name: nameIn,
      date: dateIn,
      time: timeIn,
      location: locationIn,
      description: descriptionIn,
      ticket_link: ticketLinkIn,
      visible: visibleIn
    }

    if (validateInputs(eventObject) === false) return false;

    console.log('input valid')

    dispatch({ type: 'SET_EVENT_TO_SUBMIT', payload: eventObject })
    history.push('/createEvent/preview')
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={nameIn}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="date"
          placeholder="Date"
          value={dateIn}
          onChange={(event) => setDate(event.target.value)}
        />

        <input
          type="time"
          placeholder="Time"
          value={timeIn}
          onChange={(event) => setTime(event.target.value)}
        />

        <input
          type="text"
          placeholder='Location (address, "virtual", etc)'
          value={locationIn}
          onChange={(event) => setLocation(event.target.value)}
        />

        <textarea
          placeholder="description"
          value={descriptionIn}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <input
          type="text"
          placeholder="Ticket Link (optional)"
          value={ticketLinkIn}
          onChange={(event) => setTicketLink(event.target.value)}
        />

        <div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={true}
                checked={visibleIn === true}
                onChange={() => setVisible(true)}
              />
              Public
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={false}
                checked={visibleIn === false}
                onChange={() => setVisible(false)}
              />
              Private
            </label>
          </div>
        </div>

        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}
