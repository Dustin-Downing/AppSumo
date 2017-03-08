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

// router.post('/login', function(req, res, next) { 
//
// });

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

module.exports = router;
