'use strict';

let db = require('../config');

module.exports = function(req, res) {

  db.query('SELECT date, COUNT(*) FROM DATES GROUP BY date')
  .then((result) => {
    res.status(201).send(result);
  })

}



