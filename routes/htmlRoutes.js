var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

    // Load dashboard page
    app.get("/dashboard", function(req, res) {
      res.render("users/dashboard");
    });

  // Load register page
  app.get("/register", function(req, res) {
    res.render("users/register");
  });

  // Load registry list page
  app.get("/registryList", function(req, res) {
    res.render("registry/registryList");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
