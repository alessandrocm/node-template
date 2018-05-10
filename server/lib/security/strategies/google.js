const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google, app } = require('../../../config');

module.exports = function googleStrategy() {
  return new GoogleStrategy({
      clientID      : google.clientID,
      clientSecret  : google.clientSecret,
      callbackURL   : `${app.website}/api/v1/oauth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
    }
  )
};
