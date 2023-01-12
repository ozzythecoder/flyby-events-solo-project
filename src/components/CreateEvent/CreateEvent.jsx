import EventForm from "../EventForm/EventForm";

export default function CreateEvent() {

  return (
    <>
      <EventForm goNext={'/createEvent/preview'} title={'Create Event'} />
    </>
  );
}
