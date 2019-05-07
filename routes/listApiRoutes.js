var db = require("../models");

module.exports = function (app) {
  // Get all examples

  /// Api's for list
  app.get("/api/list", function (req, res) {
    db.Lists.findAll({
      include: [db.ListItems],
      required: false
    }).then(function (results) {
      // We have access to the todos as an argument inside of the callback function
      res.json(results);
    });
  });

  app.get("/api/list/:id", function (req, res) {
    db.Lists.findOne({
      where: {
        id: req.params.id
      },
      include: [db.ListItems],
      required: false
    }).then(function (results) {
      // We have access to the todos as an argument inside of the callback function
      res.json(results);
    });
  });

  app.get("/api/list/shared/:id", function (req, res) {
    db.Lists.findAll({
      // include:[db.Lists],
      where: {
        id: req.params.id
      },
      include: [db.Shared]
    }).then(function (results) {
      res.json(results);
    });
  });


  // Create a new example
  app.post("/api/list/:userId", function (req, res) {
    db.Lists.create({
        ListName: req.body.ListName,
        GoogleID: req.body.GoogleID,
        UserId: req.params.userId
      }).then(function (results) {
        res.json(results);
      })
      .catch(function (err) {
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
    db.Lists.update({
      ListName: req.body.ListName
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.sendStatus(200);
    }).catch(function (err) {
      res.json(err);
    });
  });
};