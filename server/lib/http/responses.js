const { isNil, merge, omitBy } = require('lodash');

function response(message, errors, data, total_count, index, page) {
  if (data && isNil(total_count) && (data instanceof Array)) {
    total_count = data.length;
  }

  return omitBy({
    message,
    errors,
    data,
    total_count,
    index,
    page
  }, isNil);
}

const sendError = (statusCode, res, defaultMessage) => {
  return (errors, message) =>
    res.status(statusCode).send(response(message || defaultMessage, errors))
  ;
}

// HTTP 400 Bad Request
function sendBadRequest(res) {
  return sendError(400, res, 'Bad Request');
}

// HTTP 401 Unauthorized
function sendUnauthorized(res) {
  return sendError(401, res, 'Unauthorized');
}

// HTTP 403 Forbidden
function sendForbidden(res) {
  return sendError(403, res, 'Forbidden');
}

// HTTP 404 Not NotFound
function sendNotFound(res) {
  return sendError(404, res, 'Not Found');
}

// HTTP 418 I'm a teapot
function sendImATeapot(res) {
  return (message) =>
    res.status(418).send(message || 'I\'m a teapot')
  ;
}

// HTTP 302 Found
function sendFound(res) {
  return (message, errors, data) =>
    res.status(302).send(response(message || 'Found', errors, data))
  ;
}

const success = (statusCode, res, defaultMessage = null) =>
  (data, message = defaultMessage, total_count, index, page) =>
    res.status(200).send(response(message, null, data, total_count, index, page))
  ;

// HTTP 200 Ok
function sendOk(res) {
  return success(200, res, 'Ok');
}

// HTTP 201 Created
function sendCreated(res) {
  return success(201, res, 'Created');
}

// HTTP 202 Accepted
function sendAccepted(res) {
  return success(202, res, 'Accepted')
}

// HTTP 204 No Content
function sendNoContent(res) {
  return () => res.status(204).send();
}

function responses(res) {
  const send = {
    BadRequest    : sendBadRequest(res),
    Unauthorized  : sendUnauthorized(res),
    Forbidden     : sendForbidden(res),
    NotFound      : sendNotFound(res),
    ImATeapot     : sendImATeapot(res),
    Found     : sendFound(res),
    Ok        : sendOk(res),
    Created   : sendCreated(res),
    Accepted  : sendAccepted(res),
    NoContent : sendNoContent(res)
  };

  return merge(res, send);
}

module.exports = responses;
