const bcrypt = require('bcrypt');
const {security} = require('../../config');

function hashAsync(text, opts) {
  if (!text) { throw new Error('Value to hash is null or undefined.'); }
  opts = opts || {};
  opts.rounds = opts.rounds || security.saltRounds;
  return bcrypt.hash(text, opts.rounds);
}

function compareAsync(text, hash) {
  return bcrypt.compare(text, hash);
}

module.exports = {
  hashAsync,
  compareAsync
};
