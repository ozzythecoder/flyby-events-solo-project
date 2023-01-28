const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// =======================
// GET EVENT BY ID

router.get('/byId', rejectUnauthenticated, async (request, response) => {

  const { eventId: event_id } = request.query
  const user_id = request.user.id
  console.log('getting event with ID', event_id)

  try {
    const { rows: [event] } = await pool.query('SELECT * FROM event WHERE id = $1', [event_id])

    if (event.visible === false && event.host_id !== user_id) {

      const inviteQuery = `SELECT * FROM user_event WHERE user_id = $1 AND event_id = $2;`
      const { rows } = await pool.query(inviteQuery, [user_id, event_id])

      if (rows.length === 0) {
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

// =======================
// GET ALL USER'S EVENTS

router.get('/byUser', rejectUnauthenticated, async (request, response) => {

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

// =======================
// ADD TO MY EVENTS

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

// =======================
// CREATE NEW EVENT

router.post('/create', rejectUnauthenticated, (request, response) => {

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

// =======================
// EDIT EVENT

router.put('/edit', rejectUnauthenticated, async (request, response) => {

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

      await pool.query(queryText, [...Object.values(event), event_id])
      console.log('Updated event');
      response.sendStatus(200);

    }
  } catch (err) {
    console.log('Error updating event:', err);
    response.sendStatus(500)
  }

})

// =======================
// DELETE EVENT

router.delete('/delete/:idToDelete', rejectUnauthenticated, async (request, response) => {

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

// =======================
// DELETE FROM MY EVENTS

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