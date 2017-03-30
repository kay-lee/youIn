'use strict';

let db = require('../config');

module.exports = function(req, res) {
  db.query('SELECT * FROM invites')
  .then ( (invites) => {
    res.status(200).json(invites);
  })
  .catch( (err) => {
    res.status(400).send(err, 'Error in get_invites handler function');
  });

};
