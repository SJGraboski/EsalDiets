'use strict';
module.exports = function(sequelize, DataTypes) {
  var Diet = sequelize.define('Diet', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Diet.hasMany(models.User);
      }
    }
  });
  return Diet;
};