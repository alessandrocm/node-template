const moment = require('moment');
const { requiredParam } = require('../funcs');

function now() {
  return moment().toDate();
}

function nowPlus(amount = requiredParam('amount'), interval = 'minutes') {
  return moment().add(amount, interval).toDate();
}

module.exports = {
  now,
  nowPlus
};
