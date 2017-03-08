module.exports = function(app, passport) {
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

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/' // redirect back to the signup page if there is an error
  }));


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

  return router;
}
