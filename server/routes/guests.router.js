const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/byUsername', rejectUnauthenticated, (request, response) => {

  const { username } = request.query

  pool
    .query(`SELECT id FROM "user" WHERE username = $1`, [username])
    .then(databaseResponse => response.send(databaseResponse.rows))
    .catch(err => { console.log('/guests/byUsername', err); response.sendStatus(500) })
})

router.get('/byEvent', rejectUnauthenticated, (request, response) => {

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

router.post('/addToEvent', rejectUnauthenticated, (request, response) => {


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

router.put('/editStatus', rejectUnauthenticated, (request, response) => {

  const { event_id, guest_id, guest_state } = request.body;

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

router.delete('/deleteFromEvent', rejectUnauthenticated, async (request, response) => {

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

module.exports = router;