const uuidv4 = require('uuid/v4');

module.exports = function guid() {
  return uuidv4().replace(/-/g,'');
}
