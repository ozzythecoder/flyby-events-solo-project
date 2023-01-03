const { response } = require('express');
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
        WHERE (user_event.user_id = $1)
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

router.post('/addToMyEvents', (request, response) => {

  if (request.isAuthenticated()) {

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
      .then(databaseResponse => {
        console.log('Added to events');
        response.sendStatus(201);
      })
      .catch(err => { console.log('POST /addToMyEvents', err); response.sendStatus(500) })

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

router.put('/editEvent', (request, response) => {

  if (request.isAuthenticated()) {

    // check if user is authorized to edit event
    pool.query('SELECT host_id FROM event WHERE id = $1', [request.body.event_id])
      .then(databaseResponse => {
        if (databaseResponse.rows[0].host_id === request.user.id) {

          const event = [
            request.body.name,
            request.body.date,
            request.body.time,
            request.body.location,
            request.body.description,
            request.body.ticket_link,
            request.body.visible,
            request.body.event_id
          ]

          console.log(event);

          const queryText = `
            UPDATE event
            SET name = $1, date = $2, time = $3, location = $4, description = $5, ticket_link = $6, visible = $7
            WHERE id = $8
          ;`;
        
          pool
            .query(queryText, event)
            .then(() => {
              console.log('Updated event');
              response.sendStatus(200);
            })
            .catch(err => {
              console.log('Failed to update event:', err)
              response.sendStatus(500);
            })


        } else {
          console.log('User unauthorized', request.user.id)
          response.sendStatus(401)
        }
      }) // end authorization query
      .catch(err => { console.log('Error in /editEvent:', err); response.sendStatus(500) })
  }
})

router.delete('/:idToDelete', (request, response) => {

  if (request.isAuthenticated()) {
    const { idToDelete } = request.params

    pool
      .query('SELECT * FROM event WHERE id = $1', [ idToDelete ])
      .then(databaseResponse => {
        if (databaseResponse.rows[0].host_id === request.user.id) {

          pool
            .query('DELETE FROM event WHERE id = $1', [ idToDelete ])
            .then(() => {
              console.log('Deleted event');
              response.sendStatus(200);
            })
            .catch(err => {
              console.log('Error deleting event', err)
              response.sendStatus(500);
            })

        } else {
          console.log('Unauthorized user')
          response.sendStatus(401);
        }

      })
      .catch(err => {
        console.log('Error authorizing user to delete event', err)
        response.sendStatus(500);
      })
  }

})


module.exports = router;