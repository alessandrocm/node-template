const { pick } = require('lodash');
const { validateObject } = require('../lib/validation/validator');

function validateRequest(schema, getObject = (req) => req.body){
  return (req, res, next) => {
    const keys = Object.keys(schema);
    const object = pick(getObject(req), keys);
    const validation = validateObject(object, schema);

    if (validation.valid) {
      req.payload = object;
      return next();
    }

    return res.BadRequest(validation.errors);
  };
}

module.exports = validateRequest;
