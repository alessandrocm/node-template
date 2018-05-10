const validateRequest = require('../../../middleware/validate');
const { email, password } = require('./common');
const {
  combine,
  required,
  isLength
} = require('../../../lib/validation/schema');

const schema = {
  email     : combine(required(), email),
  password  : combine(required(), password),
  first_name : combine(required(), isLength()),
  last_name  : combine(required(), isLength())
};

module.exports = validateRequest(schema);
