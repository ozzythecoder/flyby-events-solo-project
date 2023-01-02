const express = require('express');
const { rejectUnathenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/byHost', (request, response) => {

  if (request.isAuthenticated()) {
    pool
      .query(`SELECT * FROM event WHERE host_id = $1`, [request.user.id])
      .then(databaseResponse => {
        response.send(databaseResponse.rows)
      })
      .catch(err => { console.log('Error in GET /byHost', err); response.sendStatus(500) })
  } else { response.sendStatus(401) }
})

router.get('/byGuest', (request, response) => {

  if (request.isAuthenticated()) {

    const user_id = request.user.id

    const queryText = `
      SELECT * FROM event
        JOIN user_event ON user_event.event_id = event.id
        WHERE ("user".id = $1) OR (event.host_id = $1)
    ;`;

    pool
      .query(queryText, [user_id])
      .then(databaseResponse => {
        console.log('Getting all events with userID', user_id);
        response.send(databaseResponse.rows)
      })
      .catch(err => { console.log('Error in GET /byGuest', err); response.sendStatus(500) })

  }
})

router.post('/newEvent', (request, response) => {

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
      .then(databaseResponse => { console.log('New event posted'); response.sendStatus(201) })
      .catch(err => { console.log('Error in POST /newEvent', err); response.sendStatus(500) })
    
  }
});

module.exports = router;
