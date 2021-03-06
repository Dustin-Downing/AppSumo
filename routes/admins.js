module.exports = function(app, passport) {
  var models   = require('../models');
  var express  = require('express');
  var router   = express.Router();

  router.get('/', isLoggedIn, function(req, res, next) {
    res.render('admin', {});
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
