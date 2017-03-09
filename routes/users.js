var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.User.create({
    username: req.body.username
  }).then(function(user) {
    res.json(user);
  });
});

router.get('/getByName/:username', function(req, res) {
  models.User.find({
    where: {
      username: req.params.username
    }
  }).then(function(user){
    res.json(user);
  });
});

module.exports = router;
