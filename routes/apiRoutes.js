var db = require("../models");

module.exports = function(app) {
  // put calls for user's lists here
  
  
  
  
  
  // GET route for getting all of the lists shared by friends
  app.get("/api/lists/", function(req, res) {
    db.Lists.findAll({}).then(function(dbLists) {  // this is more in line with getting the user's lists.  Need specs for getting shared lists
      res.json(dbLists);
    });
  });

  // Get route for returning lists by name
  app.get("/api/lists/listname/:listname", function(req, res) {
    db.Lists
      .findAll({
        where: {
          ListName: req.params.listname
        }
      })
      .then(function(dbLists) {
        res.json(dbLists);
      });
  });

  // Get all examples
  /*   app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  }); */
};
