var db = require("../models");

module.exports = function (app) {
  // Share ListId to User : Id is List id

  app.post("/api/shared/:id", function (req, res) {
    console.log("ListId:", req.params.id);
    db.Shared.create({
        sharedTo: req.body.sharedTo,
        ListId: req.params.id
      }).then(function (results) {
        res.json(results);
      })
      .catch(function (err) {
      res.json(err);
      });
  });
};