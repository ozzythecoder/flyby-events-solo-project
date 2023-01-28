const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//! SHOULD NOT BE USED
router.get('/allEvents', rejectUnauthenticated, (request, response) => {

  pool
    .query(`SELECT * FROM event WHERE visible = true`)
    .then(databaseResponse => response.send(databaseResponse.rows))
    .catch(err => { console.log('allEvents', err); response.sendStatus(500) })

})

router.get('/userByUsername', rejectUnauthenticated, (request, response) => {

  const { username } = request.query

  pool
    .query(`SELECT id FROM "user" WHERE username = $1`, [username])
    .then(databaseResponse => response.send(databaseResponse.rows))
    .catch(err => { console.log('/userByUsername', err); response.sendStatus(500) })
})


router.get('/eventById', rejectUnauthenticated, async (request, response) => {

  const { eventId } = request.query
  const userId = request.user.id
  console.log('getting event with ID', eventId)

  // who is authorized to view event?
  // if public event: anybody
  // if private event: host or guest

  try {
    const dbEvent = await pool.query('SELECT * FROM event WHERE id = $1', [eventId])
    const event = dbEvent.rows[0];

    if (event.visible === false && event.host_id !== userId) {

      const inviteQuery = `SELECT * FROM user_event WHERE user_id = $1 AND event_id = $2;`
      const eventToCheck = await pool.query(inviteQuery, [userId, eventId])

      if (eventToCheck.rows.length === 0) {
        response.sendStatus(401);
      } else {
        response.send(event);
      }

    } else {
      response.send(event);
    }

  } catch (err) {
    console.log("Get /eventById", err);
    response.sendStatus(500);
  }

})

router.get('/eventsByHost', rejectUnauthenticated, (request, response) => {

  pool
    .query(`SELECT * FROM event WHERE host_id = $1`, [request.user.id])
    .then(databaseResponse => {
      response.send(databaseResponse.rows)
    })
    .catch(err => { console.log('Error in GET /byHost', err); response.sendStatus(500) })

})

router.get('/eventsByGuest', rejectUnauthenticated, async (request, response) => {

  const user_id = request.user.id
  const connection = await pool.connect();

  try {
    await connection.query('BEGIN;');

    const guestQuery =
      `SELECT DISTINCT event.*, user_event.guest_state FROM event
      LEFT JOIN user_event ON user_event.event_id = event.id
      WHERE user_event.user_id = $1;`
    const hostQuery =
      `SELECT * FROM event
      WHERE event.host_id = $1;`

    const guestEvents = await connection.query(guestQuery, [user_id])
    const hostEvents = await connection.query(hostQuery, [user_id])
    await connection.query('COMMIT;')

    response.send([...guestEvents.rows, ...hostEvents.rows])
  } catch (error) {

    await connection.query('ROLLBACK;');
    response.sendStatus(500)
  } finally {
    connection.release();
  }

})

router.get('/guestsByEvent', rejectUnauthenticated, (request, response) => {

  const { event_id } = request.query

  const queryText = `
      SELECT "user".username, "user".profile_img_url, "user".id, user_event.guest_state FROM "user"
        JOIN user_event ON user_event.user_id = "user".id
        JOIN event ON event.id = user_event.event_id
        WHERE event.id = $1
    `;

  pool.query(queryText, [event_id])
    .then(databaseResponse => {
      console.log('Getting guests for event with ID', event_id)
      response.send(databaseResponse.rows)
    })
    .catch(err => { console.log('Error in GET /guestsByEvent', err); response.sendStatus(500) })

})

router.post('/addToMyEvents', rejectUnauthenticated, (request, response) => {

  const user_id = request.user.id
  const { event_id } = request.body;

  const queryText = `
      INSERT INTO user_event
        (user_id, event_id, guest_state, is_read)
      VALUES
        ($1, $2, 'added', 'true')
    ;`;

  pool
    .query(queryText, [user_id, event_id])
    .then(() => {
      console.log('Added to events');
      response.sendStatus(201);
    })
    .catch(err => { console.log('POST /addToMyEvents', err); response.sendStatus(500) })

})

router.post('/addGuest', rejectUnauthenticated, (request, response) => {


  const { user_id, event_id } = request.body;

  // ⚠️ TODO: Modify query to prevent duplicates
  const queryText = `
      INSERT INTO user_event
        (user_id, event_id, guest_state, is_read)
      VALUES
        ($1, $2, 'pending', 'false')
    ;`;

  // ⚠️ STRETCH: Add user feature to block incoming invitations

  pool
    .query(
      queryText,
      [user_id, event_id]
    )
    .then(() => { console.log('added user with ID', user_id, 'to event with id', event_id); response.sendStatus(201) })
    .catch(err => { console.log('Error in POST /addGuest', err); response.sendStatus(500) })


})

router.post('/addSelf', rejectUnauthenticated, (request, response) => {


  const { user_id, event_id } = request.body;

  const queryText = `
    INSERT INTO user_event
      (user_id, event_id, guest_state, is_read)
    VALUES
      ($1, $2, 'added', 'false')
    ;`;

  pool
    .query(queryText, [user_id, event_id])
    .then(databaseResponse => {
      response.sendStatus(201)
    })
    .catch(error => {
      console.log('/addSelf', error)
      response.sendStatus(500)
    })

})

router.post('/createEvent', rejectUnauthenticated, (request, response) => {

  const { name, date, time, location, description, ticket_link, visible } = request.body;
  const host_id = request.user.id;

  const queryText = `
      INSERT INTO event
        (name, date, time, location, description, ticket_link, visible, host_id)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
    ;`;

  pool
    .query(
      queryText,
      [name, date, time, location, description, ticket_link, visible, host_id]
    )
    .then(() => { console.log('New event posted'); response.sendStatus(201) })
    .catch(err => { console.log('Error in POST /newEvent', err); response.sendStatus(500) })

});

router.put('/editEvent', rejectUnauthenticated, async (request, response) => {

  const user_id = request.user.id
  const { event_id, ...event } = request.body

  try {
    // authorization
    const { rows: [{ host_id }] } = await pool.query('SELECT host_id FROM event WHERE id = $1', [event_id])

    if (host_id !== user_id) {
      console.log('Unauthorized')
      response.sendStatus(401)
    } else {

      const queryText = `
          UPDATE event
          SET name = $1, date = $2, time = $3, location = $4, description = $5, ticket_link = $6, visible = $7
          WHERE id = $8
        ;`;

      pool
        .query(queryText, [...Object.values(event), event_id])
        .then(() => {
          console.log('Updated event');
          response.sendStatus(200);
        })
        .catch(err => {
          console.log('Failed to update event:', err)
          response.sendStatus(500);
        })
    }
  } catch (err) {
    console.log('Error authorizing user in /editEvent:', err);
    response.sendStatus(500)
  }

})

router.put('/editStatus', rejectUnauthenticated, (request, response) => {


  const { event_id, guest_id, guest_state } = request.body;

  console.group('Editing guest state');
  console.log('guest id:', guest_id);
  console.log('event id:', event_id);
  console.log('guest state changing to:', guest_state);
  console.groupEnd();

  const queryText = `
      UPDATE user_event
        SET guest_state = $1
        WHERE event_id = $2 AND user_id = $3
    ;`;

  pool.query(queryText, [guest_state, guest_id, event_id])
    .then(() => {
      console.log('Updated guest status');
      response.sendStatus(200)
    })
    .catch(err => {
      console.log('Error updating guest status', err);
      response.sendStatus(500)
    })

})

router.delete('/deleteEvent/:idToDelete', rejectUnauthenticated, async (request, response) => {

  const { idToDelete } = request.params
  const user_id = request.user.id

  try {
    const { rows: [{ host_id }] } = await pool.query('SELECT host_id FROM event WHERE id = $1', [idToDelete])

    if (host_id !== user_id) {
      response.sendStatus(401)
    } else {
      await pool.query('DELETE FROM event WHERE id = $1', [idToDelete])
      console.log('Deleted event');
      response.sendStatus(200);
    }

  } catch (err) {
    console.log('Error deleting event', err);
    response.sendStatus(500);
  }

})

router.delete('/deleteGuest', rejectUnauthenticated, async (request, response) => {

  const user_id = request.user.id;
  const { event_id, guest_id } = request.body;

  try {
    const { rows: [{ host_id }] } = await pool.query('SELECT host_id FROM event WHERE id = $1', [event_id])

    console.log(host_id)

    if (host_id !== user_id && guest_id !== user_id) {
      console.log('Unauthorized');
      response.sendStatus(401);
    } else {
      await pool.query('DELETE FROM user_event WHERE user_id = $1 AND event_id = $2', [guest_id, event_id])
      console.log('Deleted guest', guest_id, 'from event');
      response.sendStatus(200);
    }
  } catch (err) {
    console.log('Error deleting guest', err);
    response.sendStatus(500);
  }

})

router.delete('/removeEventFromMyEvents', rejectUnauthenticated, async (request, response) => {

  const user_id = request.user.id;
  const { event_id } = request.body;

  try {
    await pool.query('DELETE FROM user_event WHERE user_id = $1 AND event_id = $2', [user_id, event_id])
    console.log('Deleted user', user_id, 'from event', event_id);
    response.sendStatus(200)
  } catch (err) {
    console.log('Error deleting user from event')
    response.sendStatus(500)
  }

})

module.exports = router;