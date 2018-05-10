const express = require('express');
const validateCreate = require('./messages/profileCreate');
const validateUpdate = require('./messages/profileUpdate');

module.exports = function profileRoutes() {
  const router = express.Router();

  async function profileExists(req, res, next) {

    const profile = req.body;
    const [error, isDuplicate] = [null, true] // TODO: verify if user is duplicate
    if (error) {
      next(error);
    }
    if (isDuplicate) {
      return res.BadRequest('DUPLICATE', 'User already exists');
    }

    next();

  }

  router.post('/',
    validateCreate,
    profileExists,
    async function(req, res, next) {

      try {

        const userService = req.instance('userService');
        const profile = req.payload;

        const [err, newUser] = await userService.addNewUser(profile);
        if (err) {
          return next(err);
        }

        return res.Created(newUser);

      } catch(err) {
        next(err);
      }

    }
  );

  return router;
};
