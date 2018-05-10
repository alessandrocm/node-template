const userData = require('./data/users');
const passwordResets = require('./data/passwordReset');
const BaseService = require('./baseService');
const shortid = require('shortid');
const bcrypt = require('../lib/security/bcrypt');
const config = require('../config').security;
const errors = require('../lib/errors/auth');

module.exports = class UserService extends BaseService {

  constructor(options) {
    super(options);
  }

  async addNewUser(user = {}) {

    const [error, password] = await this.try(bcrypt.hashAsync(user.password, {rounds: config.saltRounds}));
    if (error) {
      return [error];
    }

    return await this.try(userData.createUserAsync({...user, password}));

  }

  async retrieveUserBy({id, email, first_name, last_name, gid} = {}) {

    return await this.try(userData.retrieveUserByAsync({id, email, first_name, last_name, gid}));

  }

  async updateUserProfile(id, user = {}) {

    if (user.password) {
      const [error, password] = await this.try(bcrypt.hashAsync(user.password, {rounds: config.saltRounds}));
      if (error) {
        return [error];
      }

      user.password = password;
    }

    return await this.try(userData.updateUserAsync(id, user));

  }

  async searchAsync({email} = {}) {

    return await this.try(userData.findAsync({email}));

  }

  async isDuplicateAsync(email) {

    const [error, users] = await this.searchAsync({email});
    return [error, !!(users && users.length)];

  }

  async requestPasswordReset(user_id) {

    const token = shortid.generate();
    const [error, reset] = await this.try(passwordResets.createResetAsync({user_id, token}));
    return [error, reset];

  }

  async retrievePasswordReset(token) {

    return await this.try(passwordResets.retrieveByTokenAsync(token));

  }

  async isValidPasswordReset(token) {

    const [error, reset] = await this.retrievePasswordReset(token);
    return [error, !!reset];

  }

  async retrieveVerificationCode({user_id, code}) {

    return await this.try(userData.retrieveVerificationCodeAsync({user_id, code}));
  }

  async verifyUser({code}) {

    if (!code) {
      return [errors.invalidVerification()];
    }

    const [codeError, verification] = await this.try(userData.retrieveVerificationCodeAsync({code}));
    if (codeError || !verification) {
      return [codeError || errors.invalidVerification()];
    }

    const [updateError, user] = await this.try(userData.updateUserAsync(verification.user_id, {verified: true}));
    if (updateError) {
      return [updateError];
    }

    return [null, true];

  }

};
