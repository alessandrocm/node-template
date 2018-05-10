const sendgrid = require('@sendgrid/mail');
const config = require('../config').sendgrid;

sendgrid.setApiKey(config.apiKey);

module.exports = function({to, from, subject, text, html} = {}) {
  return sendgrid.send({
    to,
    from,
    subject,
    text,
    html
  });
};
