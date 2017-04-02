'use strict';

let db = require('../config');

module.exports = function(req, res) {
  console.log('This is req', req.body.date)

  db.query('INSERT into DATES (event_id, date) VALUES ($1, $2)', [1, req.body.date])
  .then((result) => {
    res.status(201).send('');
  })

}