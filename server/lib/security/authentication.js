const passport = require('passport');
const googleStrategy = require('./strategies/google');
const config = require('../../config').security;

module.exports = function authenticate() {

  return {

    initialize: function() {

      passport.use('google', googleStrategy());

      passport.serializeUser((user, done) => {
        done(null, user);
      });

      passport.deserializeUser(function(user, cb) {
        cb(null, user);
      });

      return passport.initialize();
    },

    gauthenticate: function(options = { scope: ['profile', 'email']}) {
      return passport.authenticate('google', options);
    }

  };

};
