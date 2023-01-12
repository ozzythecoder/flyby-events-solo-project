import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import PageTitle from "../PageTitle/PageTitle";
import EventBody from "../EventBody/EventBody";

import { Card, Box, Stack, Button } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CreateEventPreview() {
  const history = useHistory();
  const dispatch = useDispatch();

  const event = useSelector((store) => store.events.eventToSubmit);

  const createEvent = () => {
    dispatch({ type: "ADD_NEW_EVENT", payload: event });
    history.push("/myEvents");
  };

  const goBack = () => {
    history.goBack();
  };

  const handleCancel = () => {
    dispatch({ type: "CLEAR_EVENT_TO_SUBMIT" });
    history.push("/myEvents");
  };

  return (
    <div>
      <PageTitle title="Preview New Event" />
      <Card sx={{ m: 2, p: 2 }}>
        <EventBody event={event} />
      </Card>

      <Box display="flex" justifyContent="center" sx={{ m: 1 }}>
        <Button
          size="large"
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          onClick={createEvent}
        >
          Create Event
        </Button>
      </Box>
      <Stack display="flex" spacing={2} direction="row" justifyContent="center">
        <Button
          size="large"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={goBack}
        >
          Go Back
        </Button>
        <Button
          size="large"
          variant="contained"
          color="error"
          onClick={handleCancel}
        >
          Cancel and Discard
        </Button>
      </Stack>
    </div>
  );
}
