var db = require("../models");

module.exports = function (app) {
  // Get all examples

  /// Api's for list
  app.get("/api/list", function (req, res) {
    db.Lists.findAll({
      include: [db.ListItems]
    }).then(function (results) {
      // We have access to the todos as an argument inside of the callback function
      res.json(results);
    });
  });

  app.get("/api/list/:id", function(req, res) {
    db.Lists.findOne({
      where: {
        id: req.params.id
      },
      include: [db.ListItems]
    }).then(function (results) {
      // We have access to the todos as an argument inside of the callback function
      res.json(results);
    });
  });

  // Create a new example
  app.post("/api/list/:userId", function(req, res) {
    db.Lists.create({
        ListName: req.body.ListName,
        GoogleID: req.body.GoogleID,
        UserId:req.params.userId
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

  // Delete an example by id
  app.delete("/api/list/:id", function (req, res) {
    db.Lists.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  app.put("/api/list/:id", function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Lists.update({
      ListName: req.body.ListName
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.sendStatus(200);
    }).catch(function (err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });
};