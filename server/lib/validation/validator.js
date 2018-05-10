const validator = require('validator');
const { get, isArray, isBoolean, isEmpty, isNil } = require('lodash');
const schemas = require('./schema');

function validValue(passes = true) {
  if (typeof passes === 'boolean') {
    return {valid: passes};
  }
  else if (typeof passes === 'object') {
    return passes;
  }

  return false;
}

const validators = {
  
  required(value) {

    return validValue(!isNil(value));

  },

  matches(value, regex) {

    if (isNil(value)) {
      return validValue();
    }

    return validValue(validator.matches(`${value}`, regex));

  },

  isEmail(value, options) {

    if (isNil(value)) {
      return validValue();
    }

    return validValue(validator.isEmail(`${value}`, options));

  },

  isLength(value, options) {

    if (isNil(value)) {
      return validValue();
    }

    if (value instanceof Array) {
      return validValue(value.length >= options.min && (!options.max || value.length <= options.max));
    }

    return validValue(validator.isLength(`${value}`, options));

  },

  isNumeric(value) {

    if (isNil(value)) {
      return validValue();
    }

    return validValue(validator.isNumeric(`${value}`));

  },

  isDate(value) {

    if (isNil(value)) {
      return validValue();
    }

    return validValue(validator.isISO8601(value));

  },

  isArray(value, schema) {

    if (isNil(value)) {
      return validValue();
    }

    if (isEmpty(schema) || isEmpty(value)) {
      return validValue(isArray(value));
    }

    const isAnArray = validValue(isArray(value));
    return isAnArray.valid ? validateObject(value, value.map(() => schema)) : isAnArray;

  },

  isBoolean(value) {

    if(isNil(value)) {
      return validValue();
    }

    return validValue(isBoolean(value));

  },

  isString(value) {
    if (isNil(value)) {
      return validValue();
    }

    return validValue(typeof value === 'string');

  }

};

function validate(value, method = '', options = {}, object) {

  if (!method || typeof method !== 'string') {
    return validValue();
  }

  if (!validators[method]) {
    return (typeof options === 'function') ? validValue(options(object, value)) : validValue(false);
  }

  return validators[method](value, options);

}

function validateObject(object = {}, schema = {}) {

  if (isNil(object) || isEmpty(object)) {
    return {valid: false, errors: 'object is null or empty.'};
  }

  return Object.keys(schema).reduce((validation, key) =>
  {

    if (isNil(schema[key]) || isEmpty(schema[key])) {
      return validation;
    }

    const passes = Object.keys(schema[key]).reduce((result, method) =>
    {
      const pass = validate(get(object, key), method, get(schema, `${key}.${method}.options`), object);
      if (!pass.valid) {
        validation.errors[key] = validation.errors[key] || [];
        validation.errors[key].push(pass.errors || get(schema, `${key}.${method}.message`) || `(${method}): Invalid value.`);
      }

      return pass.valid && result;
    }, true);

    validation.valid = validation.valid && passes;
    return validation;

  }, {valid: true, errors: {}});

}

module.exports = {
  validate,
  validateObject,
  schemas
};
