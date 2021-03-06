'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    //TODO(): make this result be an instance of option
    result: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Answer.belongsTo(models.Question, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Answer.belongsTo(models.User);
      }
    }
  });
  return Answer;
};
