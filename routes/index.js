var models  = require('../models');
var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.User.findAll({
  }).then(function(users) {
    res.render('login', {
      title: 'Please Sign-In',
      users: users
    });
  });
});

router.get('/welcome/:userId', function(req, res, next) {
  models.User.find({
    where: {
      id: req.params.userId
    }
  }).then(function(user){
    models.Question.scope({ method: ['getUnanswered', req.params.userId]}).findAll({
      include: [ models.Option ]
    }).then(function(questions) {
      res.render('welcome', {
        user: user,
        question: questions[0]
      });
    })
  })
});

// TODO(): add auth
router.get('/dashboard', function(req, res, next) {
  models.Question.findAll({
  }).then(function(questions) {
    res.render('dash', {
      hideNew : false,
      questions : questions
    })
  })
});

// TODO(): add auth
router.get('/dashboard/:questionId', function(req, res, next) {
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
