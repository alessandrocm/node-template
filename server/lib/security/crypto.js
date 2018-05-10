const crypto = require('crypto');

module.exports = {

  createHash(value) {
    return crypto.createHash('sha256').update(value).digest('hex');
  }

};
