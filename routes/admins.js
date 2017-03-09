module.exports = function(app, passport) {
  var models   = require('../models');
  var express  = require('express');
  var router   = express.Router();
  var bcrypt   = require('bcrypt-nodejs');

  router.get('/', isLoggedIn, function(req, res, next) {
    res.render('admin', {});
    // models.Question.findAll({
    //   include: [ models.Answer, models.Option ]
    // }).then(function(questions) {
    //   res.render('admin', {
    //     hideNew : false,
    //     questions : questions
    //   })
    // })
  });

  router.get('/old', isLoggedIn, function(req, res, next) {
    models.Question.findAll({
    }).then(function(questions) {
      res.render('dash', {
        hideNew : false,
        questions : questions
      })
    })
  });

  router.get('/:questionId', isLoggedIn, function(req, res, next) {
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

  // router.post('/makeAdmin', isLoggedIn, function(res, res, next) {
  //   models.Admin.create({
  //     username : req.body.username,
  //     password : bcrypt.hashSync(req.body.password),
  //   }).then(function(admin) {
  //     res.json(admin);
  //   });
  // });

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  };


  return router;
};
