
module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: DataTypes.STRING(200),
  });
  return Category;
};

