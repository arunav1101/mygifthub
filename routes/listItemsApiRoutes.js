var db = require("../models");

module.exports = function (app) {

  /// API's for list Items

  app.get("/api/listItems", function (req, res) {
    db.ListItems.findAll({}).then(function (results) {
      // We have access to the todos as an argument inside of the callback function
      res.json(results);
    });
  });

  // Create a new example
  app.post("/api/listItems/:listId", function(req, res) {
    db.ListItems.create({
        title: req.body.title,
        url: req.body.url,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        notes: req.body.notes,
        ListId: req.params.listId
      }).then(function(results) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(results);
      })
      .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // Delete an example by id
  app.delete("/api/listItems/:id", function (req, res) {
    db.ListItems.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  app.put("/api/listItems", function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.ListItems.update({
      title: req.body.title,
      url: req.body.url,
      imgUrl: req.body.imgUrl,
      price: req.body.price,
      notes: req.body.notes,
      listId: req.body.listId
    }, {
      where: {
        id: req.body.id
      }
    }).then(function (results) {
      res.json(results);
    }).catch(function (err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });
};