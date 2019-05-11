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
      include: [db.Lists, db.Shared]
    })
      .then(res => {
        resp.render("users/dashboard", {
          userPortfolio: res[0].dataValues,
          userRegistries: res[0].dataValues.Lists
        });
      })
      .catch(err => console.log(err));
  });

  // Load index page
  app.get("/client/list/:id", function(req, resp) {
    db.Lists.findOne({
      limit: 1,
      where: {
        id: req.params.id
      },
      include: [db.ListItems]
    }).then(function(results) {
      const list = results.dataValues;
      db.User.findOne({
        where: {
          id: list.UserId
        }
      }).then(user => {
        resp.render("clients/clientList", {
          list: list,
          creator: user
        });
      });
    });
  });

  app.put("/client/listItem/claim/:ListId/:ItemId", (req, resp) => {
    db.ListItems.update(
      {
        isClaimed: true
      },
      {
        where: {
          id: req.params.ItemId
        }
      }
    ).then(item => {
      resp.redirect(`/client/list/${req.params.ListId}`);
    });
  });

  //************* */ These are Kofi's:

  app.get("/shared_lists_all", function(req, res) {
    res.render("shared_lists_all/shared_all");
  });

  app.get("/shared_lists_single", function(req, res) {
    res.render("shared_lists_single/shared_single");
  });
  app.get("/create_list", function(req, res) {
    res.render("forms/newList");
  });

  app.get("/new_item", function(req, res) {
    res.render("forms/newItem");
  });
  //************** */
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
