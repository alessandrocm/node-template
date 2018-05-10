const jwt = require('jsonwebtoken');

function createToken(data, secret, expiration) {
  return jwt.sign(data, secret, { expiresIn: expiration });
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports = {
  createToken,
  verifyToken
};
