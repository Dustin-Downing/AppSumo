var models  = require('../models');
var express = require('express');
var router  = express.Router();

// TODO(): add auth
router.get('/', function(req, res, next) {
  models.Question.findAll({
  }).then(function(questions) {
    res.render('dash', {
      hideNew : false,
      questions : questions
    })
  })
});

// TODO(): add auth
router.get('/:questionId', function(req, res, next) {
  //TODO(): add error catch for questionId that don't exist
  models.Question.findAll({
  }).then(function(questions) {
    models.Question.find({
      where: {
        id: req.params.questionId
      },
      include: [ models.Answer, models.Option ]
    }).then(function(question) {
      res.render('report', {
        hideNew : true,
        title: "admin dash",
        questions : questions,
        question : question
      })
    })
  })
});

module.exports = router;
