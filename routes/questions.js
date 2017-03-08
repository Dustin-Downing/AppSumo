module.exports = function(app, passport) {
  var models  = require('../models');
  var express = require('express');
  var router  = express.Router();

  router.post('/create', isLoggedIn, function(req, res) {
    models.Question.create({
      title : req.body.title,
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

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  };


  return router;
};
