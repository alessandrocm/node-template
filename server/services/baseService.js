const serviceFactory = require('./serviceFactory');
const log = require('../lib/logs');
const { dispatch } = require('../events/register');

module.exports = class BaseService {
  constructor(context) {
    this.context = context;
    this.instance = serviceFactory(context);
    this.log = log.child({identifier: context.identifier});
  }

  get contextId() {
    return this.context.identifier;
  }

  dispatch(event) {
    dispatch({...event, identifier: this.contextId});
  }

  getInstance(name) {
    return this.instance(name);
  }

  makeError(message) {
    const serviceError = new Error(message);

    // preserve original stack trace
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        serviceError,
        this
      );
    }

    return [serviceError];
  }

  async try(promise) {
    return promise.then(result => [null, result])
      .catch(err => {
        this.log.error(err);
        return [err];
      })
    ;
  }

};
