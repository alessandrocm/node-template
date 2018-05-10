
// AUTH ERRORS START @ 100

const codes = {
  UNVERIFIED          : 100,
  INVALIDVERIFICATION : 101
};

module.exports = {

  unVerifiedError(message = 'User has not verified their email') {
    const error = new Error(message);
    error.err_code  = codes.UNVERIFIED;
    return error;
  },

  invalidVerification(message = 'Provided verification code is invalid') {
    const error = new Error(message);
    error.err_code  = codes.INVALIDVERIFICATION;
    return error;
  }

};
