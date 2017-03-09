'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    question: {
      type     : DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Question.hasMany(models.Answer);
        Question.hasMany(models.Option);
      }
    },
    scopes: {
      getUnanswered: function(userId) {
        // const tempSQL = sequelize.dialect.QueryGenerator.selectQuery('Answer',
        //   attributes: ['QuestionId'],
        //   where: {
        //        field1: 1
        //   })
        //   .slice(0,-1); // to remove the ';' from the end of the SQL


        return {
          where: {
            //update this to use the userId passed in to join Answers, find questions not in that list
            id: {
              //TODO(): sanatize for injections
              $notIn: [sequelize.literal('select QuestionId from Answers where UserId='+userId)]
            }
          },
          order: [
            sequelize.fn( 'RAND' ),
          ]
        }
      }
    }
  });
  return Question;
};
