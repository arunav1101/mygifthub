var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  // Load dashboard page *** HOANG LE ***
  app.get("/dashboard", function (req, resp) {
    // console.log(req.user.GoogleID)
    db.User.findAll({
      where: {
        GoogleID: req.user.GoogleID
      },
      include: [db.Lists]
    })
      .then(res => {
        resp.render("users/dashboard", {
          userPortfolio: res[0].dataValues,
          userRegistries: res[0].dataValues.Lists
        });
      })
      .catch(err => console.log(err));
  });

  // Load registry list page
  app.get("/registryList", function (req, res) {
    res.render("registry/registryList");
  });

  // Load edit list page
  app.get("/user/edit/:id", function (req, res) {
    res.render("users/editList");
  });
  //************* */ These are Kofi's:

  app.get("/shared_lists_all", function (req, res) {
    res.render("shared_lists_all/shared_all");
  });

  app.get("/shared_lists_single", function (req, res) {
    res.render("shared_lists_single/shared_single");
  });

  app.get("/create_list", function (req, res) {
    res.render("forms/newList");
  });

  app.get("/new_item", function (req, res) {
    res.render("forms/newItem");
  });

  //************** */

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
