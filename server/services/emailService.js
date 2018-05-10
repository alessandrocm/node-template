const BaseService = require('./baseService');
const sendgrid = require('../lib/sendgrid');
const config = require('../config').app;
const { concat } = require('../lib/utils/strings');
const { get } = require('lodash');

module.exports = class EmailService extends BaseService {

  constructor(options) {
    super(options);
  }

  get systemEmail() {
    return config.appEmail;
  }

  async sendEmail({to, from, subject, text, html} = {}) {
    return await this.try(sendgrid({
      to,
      from,
      subject,
      html
    }));
  }
  
};
