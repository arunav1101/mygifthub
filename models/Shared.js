module.exports = function(sequelize, DataTypes) {
	var Shared = sequelize.define('Shared', {
		ListId: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [ 1 ]
			}
		},
		sharedTo: {
			type: DataTypes.INTEGER(225),
			allowNull: false,
			validate: {
				len: [ 1 ]
			}
		}
	});

	// Shared.associate = function (models) {
	//   Shared.belongsTo(models.Lists, {
	//     foreignKey: "ListId",
	//     onDelete: "cascade"
	//   });
	// };

	return Shared;
};
