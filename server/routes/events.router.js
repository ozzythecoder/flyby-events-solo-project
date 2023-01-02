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

router.post('/', (request, response) => {
  // POST route code here
});

module.exports = router;
