const util = require('util');
const { merge } = require('lodash');

module.exports = {
  combine(...checks) {
    return merge(...checks);
  },

  required(message = 'This field is required.') {
    return {
      required: {
        message
      }
    };
  },

  matches(regex, message = 'Must be valid format') {
    return {
      matches : {
        options : regex,
        message
      }
    };
  },

  isEmail(message = 'Must be a valid email.') {
    return {
      isEmail : {
        message
      }
    };
  },

  isLength(min = 1, max, message) {
    const defaultMessage = 'Minimum length of %d characters and a maximum of %s.';
    return {
      isLength : {
        options : {
          min,
          max,
        },
        message: message || util.format(defaultMessage, min, max && `${max}` || 'indefinite')
      }
    };
  },

  isNumeric(message = 'Must be numeric.') {
    return {
      isNumeric : {
        message
      }
    };
  },

  isDate(message = 'Must be ISO 8601 date format.') {
    return {
      isDate : {
        message
      }
    };
  },

  isArray(schema = {}, message = 'Must be an array.') {
    return {
      isArray : {
        options : schema,
        message
      }
    };
  },

  isBoolean(message = 'This field must be a boolean value.') {
    return {
      isBoolean : {
        message
      }
    };
  },

  isString(message = 'This field must be a string.') {
    return {
      isString : {
        message
      }
    };
  },

  custom(name = 'custom', validator = (obj, val) => true, message) {
    return {
      [name] : {
        options : validator,
        message
      }
    };
  }
};
