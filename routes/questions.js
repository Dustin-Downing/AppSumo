var models  = require('../models');
var express = require('express');
var router  = express.Router();

// TODO(): add auth
router.post('/create', function(req, res) {
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

module.exports = router;
