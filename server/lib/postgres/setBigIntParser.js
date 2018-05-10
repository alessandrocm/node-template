const pg = require('pg');

function parseBigInt(value) {
  if (value === null) {
    return value;
  }

  const newValue = Number.parseInt(value, 10);
  if (!newValue && newValue !== 0) {
    return value;
  }

  return newValue;
}

module.exports = function setBigIntParser() {
  pg.types.setTypeParser(20, 'text', parseBigInt);
};
