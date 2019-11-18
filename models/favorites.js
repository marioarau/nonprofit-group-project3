module.exports = function (sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    donationAmt: DataTypes.DECIMAL(10, 2)
  });

  Favorites.associate = function (models) {
    // We're saying that a Favorite entry belongs to a user
    // A Favorite can't be created without a User due to the foreign key constraint
    Favorites.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Favorites.associate = function (models) {
    // We're saying that a Favorite entry belongs to a user
    // A Favorite can't be created without a User due to the foreign key constraint
    Favorites.belongsTo(models.Nonprofit, {
      foreignKey: {
        allowNull: false
      }
    });
  };


  return Favorites;
};
