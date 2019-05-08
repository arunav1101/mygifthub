module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    // Giving the User model a name of type STRING
    GoogleID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  // User.associate = function (models) {
  //   // Associating User with Listss
  //   // When an User is deleted, also delete any associated Listss
  //   User.hasMany(models.Lists, {
  //     // foreignkey:"id",
  //     onDelete: "CASCADE"
  //   });

  //   User.hasMany(models.Shared,{
  //     foreignKey:'sharedTo',
  //     onDelete: "cascade"
  //   });
  // };

  return User;
};