var db = require("../models");

module.exports = function (app) {
  // Get all examples

  /// Api's for list
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (results) {
      // We have access to the todos as an argument inside of the callback function
      res.json(results);
    });
  });

  app.get("/api/users/:id", function (req, res) {
    db.User.findAll({
      limit: 1,
      where: {
        id: req.params.id
      },
      include: [{
          model: db.Lists,
          required: false,
          where: {
            UserId: req.params.id
          }
        },
        {
          model: db.Shared,
          required: false,
          where: {
            sharedTo: req.params.id
          }
        }
      ]
    }).then(function (results) {
      // We have access to the todos as an argument inside of the callback function
      res.json(results);
    });
  });

  app.post("/api/users", function (req, res) {
    db.User.create({
        GoogleID: req.body.GoogleID,
        emailAddress: req.body.emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        photo: req.body.photo
      }).then(function (results) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(results);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });


};