const shortid = require('shortid');

module.exports = function requestId(req, res, next) {
  req.identifier = shortid.generate();
  next();
};
