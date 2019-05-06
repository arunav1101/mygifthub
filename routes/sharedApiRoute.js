var db = require("../models");

module.exports = function (app) {

  // the list shared to number of user
  app.get("/api/shared/:listId", function (req, res) {
    console.log("test", req.params.listId);
    db.Shared.findOne({
      where: {
        sharedTo: req.params.listId
      }
    }).then(function (res) {
      res.json(res);
    });
  });

  // Share ListId to User : Id is List id

  app.post("/api/shared/:id", function (req, res) {
    console.log("ListId:", req.params.id);
    db.Shared.create({
        sharedTo: req.body.sharedTo,
        ListId: req.params.id
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