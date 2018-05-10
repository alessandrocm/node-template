const morgan = require('morgan');
const appConfig = require('../config').app;

morgan.token('id', req => req.identifier);

module.exports = morgan(':method :url :status :response-time ms - :res[content-length] :id', {
  skip: function (req, res) {
    return (appConfig.environment === 'production');
  }
});
