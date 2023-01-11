import { Card, CardContent, Typography } from '@mui/material'
import { useSelector } from 'react-redux';

export default function MyEventsItem({ event }) {

  const user = useSelector(store => store.user)

  return (
    <div>
      <a href={`/#/event/${event.id}`}>
        <Card sx={{ mb: 2, mx: 2 }} variant="outlined">
          <CardContent>
            <Typography variant="h3">
              {event.name}

              {user.id === event.host_id && " - Hosting"}
            </Typography>
            <Typography variant="body1">
              {/* ⚠️ FORMAT WITH LUXON.JS */}
              When: {new Date(event.date).toLocaleDateString()}
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
