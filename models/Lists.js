module.exports = function(sequelize, DataTypes) {
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
    }
  });

  Lists.associate = function(models) {
    // We're saying that a Lists should belong to an Author
    // A Lists can't be created without an Author due to the foreign key constraint
    Lists.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Lists.associate = function(models) {
    // Associating User with Listss
    // When an User is deleted, also delete any associated Listss
    Lists.hasMany(models.ListItems, {
      onDelete: "cascade"
    });
  };

  return Lists;
};
