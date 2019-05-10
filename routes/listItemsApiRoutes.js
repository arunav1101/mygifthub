var db = require('../models');

module.exports = function (app) {
	/// API's for list Items

	app.get('/api/listItems/:listId', function (req, res) {
		db.ListItems
			.findAll({
				where: {
					ListId: req.params.listId
				}
			})
			.then(function (results) {
				// We have access to the todos as an argument inside of the callback function
				res.render('users/editList', {
					list: results,
					listId: req.params.listId
				});
			})
			.catch((err) => console.log(err));
	});

	app.get('/api/listItems/edit/:id', function (req, res) {
		db.ListItems
			.findAll({
				where: {
					id: req.params.id
				}
			})
			.then(function (results) {
				// We have access to the todos as an argument inside of the callback function
				res.render('users/listItemEdit', {
					list: results[0].dataValues
				});
			})
			.catch((err) => console.log(err));
	});

	// Create a new example
	app.post('/api/listItems/:listId', function (req, res) {
		db.ListItems
			.create({
				title: req.body.name,
				url: req.body.url,
				imgUrl: req.body.imgURL,
				price: req.body.price,
				notes: req.body.notes,
				ListId: req.params.listId
			})
			.then(function (results) {
				// We have access to the new todo as an argument inside of the callback function
				res.redirect(`/api/listItems/${req.params.listId}`);
			})
			.catch(function (err) {
				// Whenever a validation or flag fails, an error is thrown
				// We can "catch" the error to prevent it from being "thrown", which could crash our node app
				res.json(err);
			});
	});

	// Delete an example by id
	app.delete('/api/listItems/:id', function (req, res) {
		db.ListItems
			.destroy({
				where: {
					id: req.params.id
				}
			})
			.then(function (results) {
				res.json(results);
			});
	});

	app.put('/api/listItems/:id/:ListId', function (req, res) {
		const newListItem = {
			title: req.body.title,
			url: req.body.url,
			imgUrl: req.body.imgUrl,
			price: req.body.price,
			notes: req.body.notes
		};

		db.ListItems
			.update(newListItem, {
				where: {
					id: req.params.id
				}
			})
			.then(function (results) {
				console.log(results)
				res.redirect(`/api/listItems/${req.params.ListId}`);
			})
			.catch(function (err) {
				// Whenever a validation or flag fails, an error is thrown
				// We can "catch" the error to prevent it from being "thrown", which could crash our node app
				res.json(err);
			});
	});
};