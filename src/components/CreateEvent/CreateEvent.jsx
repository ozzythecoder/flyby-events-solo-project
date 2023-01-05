import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CreateEvent() {
  const dispatch = useDispatch();

  const [nameIn, setName] = useState("");
  const [dateIn, setDate] = useState("");
  const [timeIn, setTime] = useState("");
  const [locationIn, setLocation] = useState("");
  const [descriptionIn, setDescription] = useState("");
  const [ticketLinkIn, setTicketLink] = useState("");
  const [visibleIn, setVisible] = useState(false);

  const validateInputs = () => {
  
  }

  const handleSubmit = () => {

    const eventObject = {
      name: nameIn,
      date: dateIn,
      time: timeIn,
      location: locationIn,
      description: descriptionIn,
      ticket_link: ticketLinkIn,
      visible: visibleIn
    }

    validateInputs();
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
