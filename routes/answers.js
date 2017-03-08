var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.Answer.create({
    result: req.body.result,
    UserId: req.body.UserId,
    QuestionId: req.body.QuestionId
  }).then(function(answer) {
    res.json(answer);
  });
});

module.exports = router;
