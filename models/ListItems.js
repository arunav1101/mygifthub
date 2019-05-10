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
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
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
    },
    isClaimed: {
      type: DataTypes.Boolean,
      default: false,
      len: [1]
    }
  });

  ListItems.associate = function(models) {
    // We're saying that a ListItems should belong to an Author
    // A ListItems can't be created without an Author due to the foreign key constraint
    ListItems.belongsTo(models.Lists, {
      onDelete: "cascade"
    });
  };

  return ListItems;
};
