const auth = require('../lib/security/authentication')();

module.exports = function authenticate(options) {
  return auth.gauthenticate(options);
};
