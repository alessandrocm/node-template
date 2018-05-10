const serviceFactory = require('../services/serviceFactory');

module.exports = function services(req, res, next) {
  req.instance = serviceFactory({identifier: req.identifier});
  next();
};
