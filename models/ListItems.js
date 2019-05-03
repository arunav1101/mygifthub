module.exports = function(sequelize, DataTypes) {
  var ListItems = sequelize.define("ListItems", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  ListItems.associate = function(models) {
    // We're saying that a ListItems should belong to an Author
    // A ListItems can't be created without an Author due to the foreign key constraint
    ListItems.belongsTo(models.Lists, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return ListItems;
};
