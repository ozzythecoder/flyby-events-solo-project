import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";

import {
  TextField,
  Radio,
  RadioGroup,
  Input,
  FormControl,
  FormLabel,
  FormControlLabel,
} from '@mui/material'

export default function EventForm({ goNext, eventId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { eventToSubmit } = useSelector(store => store.events)
  
  const [nameIn, setName] = useState(eventToSubmit.name);
  const [dateIn, setDate] = useState(eventToSubmit.date?.slice(0,10) || '');
  const [timeIn, setTime] = useState(eventToSubmit.time?.slice(0,8) || '');
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
    history.push(goNext)
  };

  const handleCancel = () => {

    dispatch({ type: 'CLEAR_EVENT_TO_SUBMIT' })
    history.goBack();
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>

        <TextField
          label="Event Title"
          type="text"
          value={nameIn}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          type="date"
          placeholder="Date"
          value={dateIn}
          onChange={(event) => setDate(event.target.value)}
        />

        <TextField
          type="time"
          placeholder="Time"
          value={timeIn}
          onChange={(event) => setTime(event.target.value)}
        />

        <TextField
          type="text"
          label="Location"
          placeholder='Address, "Virtual", etc.'
          value={locationIn}
          onChange={(event) => setLocation(event.target.value)}
        />

        <TextField
          label="Description"
          value={descriptionIn}
          onChange={(event) => setDescription(event.target.value)}
        />

        <TextField
          type="text"
          label="Web Link (optional)"
          placeholder="Tickets, Zoom Link, etc."
          value={ticketLinkIn}
          onChange={(event) => setTicketLink(event.target.value)}
        />

        <div>

        <FormControl>
          <FormLabel>Event Visibility</FormLabel>
          <RadioGroup value={visibleIn} onChange={event => setVisible(event.target.value)}>
            <FormControlLabel value={true} label="Public" control={<Radio />} />
            <FormControlLabel value={false} label="Private" control={<Radio />} />
          </RadioGroup>
        </FormControl>

        </div>

        <button type='submit'>
          Submit
        </button>
      </form>
      <button
        onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}
