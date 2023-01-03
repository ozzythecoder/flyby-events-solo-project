const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/eventsByHost', (request, response) => {

  if (request.isAuthenticated()) {
    pool
      .query(`SELECT * FROM event WHERE host_id = $1`, [request.user.id])
      .then(databaseResponse => {
        response.send(databaseResponse.rows)
      })
      .catch(err => { console.log('Error in GET /byHost', err); response.sendStatus(500) })
  }
})

router.get('/eventsByGuest', (request, response) => {
  // TODO: TEST ⚠️

  if (request.isAuthenticated()) {

    const user_id = request.user.id

    const queryText = `
      SELECT event.*, user_event.guest_state FROM event
        JOIN user_event ON user_event.event_id = event.id
        JOIN "user" on "user".id = user_event.user_id
        WHERE ("user".id = $1) OR (event.host_id = $1)
        ORDER BY user_event.guest_state DESC
    ;`;

    pool
      .query(queryText, [user_id])
      .then( databaseResponse => {
        console.log('Getting all events with userID', user_id);
        response.send(databaseResponse.rows)
      })
      .catch( err => { console.log('Error in GET /byGuest', err); response.sendStatus(500) })

  }
})

router.get('/guestsByEvent', (request, response) => {
  
  if (request.isAuthenticated()) {

    const { event_id } = request.body

    const queryText = `
      SELECT "user".username, "user".profile_img_url, user_event.guest_state FROM "user"
        JOIN user_event ON user_event.user_id = "user".id
        JOIN event ON event.id = user_event.event_id
        WHERE event.id = $1
    `;

    pool.query(queryText, [event_id])
      .then( databaseResponse => {
        console.log('Getting guests for event with ID', event_id)
        response.send(databaseResponse.rows)
      })
      .catch( err => { console.log('Error in GET /guestsByEvent', err); response.sendStatus(500) })

  }
})

router.post('/addGuest', (request, response) => {

  if (request.isAuthenticated()) {

    const { username, event_id } = request.body;

    // ⚠️ TODO: Modify query to prevent duplicates
    const queryText = `
      INSERT INTO user_event
        (user_id, event_id, guest_state, is_read)
      VALUES
        ( (SELECT id FROM "user" WHERE username = $1), $2, 'pending', 'false')
    ;`;

    // ⚠️ TODO: Add user feature to block incoming invitations

    pool
      .query(
        queryText,
        [ username, event_id ]
      )
      .then( () => { console.log('added user', username, 'to event with id', event_id); response.sendStatus(201) })
      .catch(err => { console.log('Error in POST /addGuest', err); response.sendStatus(500) })

  }

})

router.post('/createEvent', (request, response) => {

  if (request.isAuthenticated()) {

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
        [ name, date, time, location, description, ticket_link, visible, host_id ]
      )
      .then( () => { console.log('New event posted'); response.sendStatus(201) })
      .catch(err => { console.log('Error in POST /newEvent', err); response.sendStatus(500) })
    
  }
});

module.exports = router;
