var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load dashboard page *** HOANG LE ***
  app.get("/dashboard", function(req, resp) {
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
  app.get("/registryList", function(req, res) {
    res.render("registry/registryList");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
