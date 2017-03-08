'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Answer);
        // User.belongsTo(models.Question, { as: 'nextRandomQuestion' })
      }
    }
  });
  return User;
};
