var db = require('../config.js');

module.exports = function(req, res) {
	db.query(`INSERT INTO invites (user_id, name, email) VALUES (${req.user.user_id}, '${req.body.name}', '${req.body.email}');`)
	.then((result) => {
		console.log(result);
		return db.query(`SELECT id FROM invites WHERE user_id = '${req.user.user_id}' AND email = '${req.body.email}' LIMIT 1`);
	})
	.then((results) => {	
		res.status(201).json({
			id: results[0].id,
			user_id: req.body.user_id, 
			name: req.body.name, 
			email: req.body.email
		})
	})
	.catch((error) => {
		res.status(400).json({
			user_id: req.body.user_id, 
			name: req.body.name, 
			email: req.body.email,
			errors: [error]
		})
	});
}