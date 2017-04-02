'use strict';

let db = require('../config');

module.exports = function(req, res) {
  let name = req.body.name;
  let email = req.body.email;


  db.query('SELECT * FROM invites')
  .then((result) => {
    res.status(201).send(result);
  })

}