module.exports = function(app, passport) {
  var models  = require('../models');
  var express = require('express');
  var router  = express.Router();

  router.post('/create', isLoggedIn, function(req, res) {
    models.Question.create({
      question : req.body.question,
    }).then(function(question) {
      req.body.options.forEach(function(option) {
        models.Option.create({
          discription : option,
          QuestionId : question.id
        }).then();
      })
      res.json(question);
    });
  });

  router.get('/all',isLoggedIn, function(req, res) {
    models.Question.findAll({
      include: [ models.Answer, models.Option ]
    }).then(function(questions) {
      res.json(questions);
    });
  });

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  };


  return router;
};
