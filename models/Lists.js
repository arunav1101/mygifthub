module.exports = function (sequelize, DataTypes) {
  var Lists = sequelize.define("Lists", {
    ListName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    GoogleID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    UserId: {
      type: DataTypes.INTEGER(225),
      validate: {
        len: [1]
      }
    }

  });

  // Lists.associate = function (models) {
  //   // We're saying that a Lists should belong to an Author
  //   // A Lists can't be created without an Author due to the foreign key constraint
  //   Lists.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  // Lists.associate = function (models) {
  //   Lists.hasMany(models.ListItems, {
  //     onDelete: "cascade"
  //   });

  //   Lists.hasMany(models.Shared, {
  //     foreignKey: "ListId",
  //     onDelete: "cascade"
  //   });
  // };
  return Lists;
};