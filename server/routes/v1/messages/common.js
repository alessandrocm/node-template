const {
  matches,
  isEmail
} = require('../../../lib/validation/schema');

module.exports = {
  email     : isEmail(),
  password  : matches(/^(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[0-9].*).{6,}$/, 'Must contain: One uppercase, one lowercase, one number, and be at least 6 characters.')
};
