const { trim } = require('lodash');

module.exports = {

  concat(arrayOfStrings, joinWith = ' ') {
    if (arrayOfStrings instanceof Array) {
      return arrayOfStrings.map(trim)
       .filter(s => !!s)
       .join(joinWith)
      ;
    }

    return '';
  }

};
