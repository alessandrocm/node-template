const responses = require('../lib/http/responses');

module.exports = function (req, res, next) {
  responses(res);
  next();
};
