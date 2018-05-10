const appConfig = require('../config').app;
const bunyan = require('bunyan');
const log = bunyan.createLogger({
  name  : appConfig.name,
  level : appConfig.logLevel
});

module.exports = {
  child(options) {
    return log.child(options);
  },

  error(...args) {
    log.error(...args);
  },

  warn(...args) {
    log.warn(...args);
  },

  info(...args) {
    log.info(...args);
  }
};
