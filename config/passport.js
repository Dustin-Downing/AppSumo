var LocalStrategy   = require('passport-local').Strategy;
var models  = require('../models');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(admin, done) {
    done(null, admin.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
    //     done(err, user);
    // });
    models.Admin.find({
      where: {
        id: id
      }
    }).then(function(admin, err){
      done(err, admin);
    });
  });

    // // =========================================================================
    // // LOCAL SIGNUP ============================================================
    // // =========================================================================
    // // we are using named strategies since we have one for login and one for signup
    // // by default, if there was no name, it would just be called 'local'
    //
    // passport.use('local-signup', new LocalStrategy({
    //     // by default, local strategy uses username and password, we will override with email
    //     usernameField : 'email',
    //     passwordField : 'password',
    //     passReqToCallback : true // allows us to pass back the entire request to the callback
    // },
    // function(req, email, password, done) {
    //
    //     // asynchronous
    //     // User.findOne wont fire unless data is sent back
    //     process.nextTick(function() {
    //
    //     // find a user whose email is the same as the forms email
    //     // we are checking to see if the user trying to login already exists
    //     User.findOne({ 'local.email' :  email }, function(err, user) {
    //         // if there are any errors, return the error
    //         if (err)
    //             return done(err);
    //
    //         // check to see if theres already a user with that email
    //         if (user) {
    //             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    //         } else {
    //
    //             // if there is no user with that email
    //             // create the user
    //             var newUser            = new User();
    //
    //             // set the user's local credentials
    //             newUser.local.email    = email;
    //             newUser.local.password = newUser.generateHash(password);
    //
    //             // save the user
    //             newUser.save(function(err) {
    //                 if (err)
    //                     throw err;
    //                 return done(null, newUser);
    //             });
    //         }
    //
    //     });
    //
    //     });
    //
    // }));


  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) { // callback with email and password from our form
    models.Admin.find({
      where: {
        username: username
      }
    }).then(function(admin, err){
      // if there are any errors, return the error before anything else
      if (err)
        return done(err);
      // if no user is found, return the message
      if (!admin)
        return done(null, false);
      // if the user is found but the password is wrong
      if (!bcrypt.compareSync(password, admin.password))
        return done(null, false);
      // all is well, return successful user
      return done(null, admin);
    });
  }));
};
