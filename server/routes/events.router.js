const express = require('express');
const { rejectUnathenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
