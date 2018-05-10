const logger = require('../lib/logs');

module.exports = function errorHandler(error, req, res, next) {
  const log = logger.child({identifier: req.identifier});
  log.error(error);

  if (error.err_code) {
    return res.status(500).send(error);
  }

  return res.status(500).send({error_description: 'Internal Server Error'});
}
