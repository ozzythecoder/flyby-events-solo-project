import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Card, Button, Box, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import PageTitle from "../PageTitle/PageTitle";
import EventBody from "../EventBody/EventBody";

export default function EditEventPreview() {
  const dispatch = useDispatch();
  const history = useHistory();

  const event = useSelector((store) => store.events.eventToSubmit);
  const eventId = useSelector((store) => store.events.eventEditId);

  const handleConfirm = () => {
    dispatch({
      type: "EDIT_EVENT",
      payload: { ...event, event_id: eventId },
    });
    history.push("/event/" + eventId);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const handleCancel = () => {
    dispatch({
      type: "CLEAR_EVENT_TO_SUBMIT",
    });
    history.push("/home");
  };

  return (
    <>
      <PageTitle title="Preview Edits" />
      <Card variant="outlined" sx={{ m: 2, p: 2 }}>
        <EventBody event={event} />
      </Card>
      <Box display="flex" justifyContent="center" sx={{ m: 1 }}>
        <Button
          size="large"
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          onClick={handleConfirm}
        >
          Confirm Edits
        </Button>
      </Box>
      <Stack display="flex" spacing={2} direction="row" justifyContent="center">
        <Button
        size="large"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
        >
          Go Back
        </Button>
        <Button size="large" variant="contained" color="error" onClick={handleCancel}>
          Cancel and Discard
        </Button>
      </Stack>
    </>
  );
}
