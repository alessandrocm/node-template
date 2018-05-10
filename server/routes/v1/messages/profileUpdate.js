const validateRequest = require('../../../middleware/validate');
const { email, password } = require('./common');
const {
  isLength
} = require('../../../lib/validation/schema');

const schema = {
  email,
  password,
  first_name : isLength(),
  last_name  : isLength()
};

module.exports = validateRequest(schema);
