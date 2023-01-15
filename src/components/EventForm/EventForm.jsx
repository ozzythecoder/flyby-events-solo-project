import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  TextField,
  Radio,
  RadioGroup,
  Button,
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";

import PageTitle from "../PageTitle/PageTitle";

export default function EventForm({ goNext, title }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { eventToSubmit } = useSelector((store) => store.events);

  const [nameIn, setName] = useState(eventToSubmit.name);
  const [dateIn, setDate] = useState(eventToSubmit.date?.slice(0, 10) || "");
  const [timeIn, setTime] = useState(eventToSubmit.time?.slice(0, 8) || "");
  const [locationIn, setLocation] = useState(eventToSubmit.location || "");
  const [descriptionIn, setDescription] = useState(
    eventToSubmit.description || ""
  );
  const [ticketLinkIn, setTicketLink] = useState(
    eventToSubmit.ticket_link || ""
  );
  const [visibleIn, setVisible] = useState(eventToSubmit.visible || false);

  const validateInputs = (eventObject) => {
    let { ticket_link, visible, ...eventToValidate } = eventObject;

    if (Object.values(eventToValidate).some((value) => !value)) {
      console.log("falsy values");
      alert("Please complete all required fields.");

      // ⚠️ ALERT USER

      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("in handlesubmit");

    const eventObject = {
      name: nameIn,
      date: dateIn,
      time: timeIn,
      location: locationIn,
      description: descriptionIn,
      ticket_link: ticketLinkIn,
      visible: visibleIn,
    };

    if (validateInputs(eventObject) === false) return false;

    console.log("input valid");

    dispatch({ type: "SET_EVENT_TO_SUBMIT", payload: eventObject });
    history.push(goNext);
  };

  const handleCancel = () => {
    dispatch({ type: "CLEAR_EVENT_TO_SUBMIT" });
    history.goBack();
  };

  const autoFill = () => {
    setName('RZ Shahid, Ozzy, and Endless Grudge')
    setDate('2023-01-21')
    setTime('22:00')
    setLocation('331 Club')
    setDescription('Free show! Music at 10pm sharp. Endless Grudge\'s debut, and Ozzy\'s first show in three years. The Whicks will be spinning.')
    setVisible(true)
  }

  return (
    <div>
      <PageTitle title={title} onClick={autoFill} />

      <form onSubmit={handleSubmit}>
        <Stack sx={{ m: 2 }} spacing={1}>
          <TextField
            label="Event Title"
            type="text"
            required
            value={nameIn}
            onChange={(event) => setName(event.target.value)}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            type="date"
            label="Date"
            placeholder="Date"
            required
            value={dateIn}
            onChange={(event) => setDate(event.target.value)}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Time"
            type="time"
            placeholder="Time"
            required
            value={timeIn}
            onChange={(event) => setTime(event.target.value)}
          />

          <TextField
            type="text"
            label="Location"
            placeholder='Address, "Virtual", etc.'
            required
            value={locationIn}
            onChange={(event) => setLocation(event.target.value)}
          />

          <TextField
            type="text"
            label="Web Link (optional)"
            placeholder="Ticket Purchase, Zoom Link, etc."
            value={ticketLinkIn}
            onChange={(event) => setTicketLink(event.target.value)}
          />

          <TextField
            label="Description"
            multiline
            maxRows={3}
            placeholder="A short paragraph describing your event"
            required
            value={descriptionIn}
            onChange={(event) => setDescription(event.target.value)}
          />

          <Box>
            <FormControl>
              <FormLabel>Event Visibility</FormLabel>
              <RadioGroup
                value={visibleIn}
                onChange={(event) => setVisible(event.target.value)}
              >
                <Stack direction="row">
                  <FormControlLabel
                    value={true}
                    label="Public"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value={false}
                    label="Private"
                    control={<Radio />}
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-evenly">
          <Button size="large" variant="contained" color="success" type="submit">
            Submit
          </Button>
          <Button size="large" variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </div>
  );
}
