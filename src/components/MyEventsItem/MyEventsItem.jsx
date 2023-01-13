import { Card, CardContent, Typography } from '@mui/material'
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';

export default function MyEventsItem({ event }) {

  const user = useSelector(store => store.user)

  return (
    <div>
      <a href={`/#/event/${event.id}`}>
        <Card sx={{ m: 2 }} variant="outlined">
          <CardContent>
            <Typography variant="h3">
              {event.name}

            </Typography>
            <Typography variant="subheading">
              {user.id === event.host_id && "You are hosting this event"}
            </Typography>
            <Typography variant="body1">
              {/* ⚠️ FORMAT WITH LUXON.JS */}
              When: {DateTime.fromISO(event.date).toLocaleString(DateTime.DATE_MED)}
            </Typography>
            <Typography variant="body1">Where: {event.location}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {event.description}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </div>
  );
}
