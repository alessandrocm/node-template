const express = require('express');
const validateCreate = require('./messages/profileCreate');
const validateUpdate = require('./messages/profileUpdate');

module.exports = function profileRoutes() {
  const router = express.Router();

  async function profileExists(req, res, next) {

    const userService = req.instance('userService');
    const profile = req.body;
    const [error, isDuplicate] = await userService.isDuplicateAsync(profile.email);
    if (error) {
      next(error);
    }
    if (isDuplicate) {
      return res.BadRequest('DUPLICATE', 'User already exists');
    }

    next();

  }

  /**
   * @swagger
   * /profiles:
   *   post:
   *     tags:
   *       - Profiles
   *     description: Create a new user profile
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Profile'
   *         x-examples:
   *           application/json: |-
   *             {
   *               "email": "email@company.com",
   *               "password": "VerySecurePassword!",
   *               "first_name": "John",
   *               "last_name": "Doe"
   *             }
   *     responses:
   *       200:
   *         description: Newly created profile
   *         schema:
   *           $ref: '#/definitions/Response'
   * definitions:
   *  Profile:
   *    properties:
   *      email:
   *        type: string
   *      password:
   *        type: string
   *      first_name:
   *        type: string
   *      last_name:
   *        type: string
   *  Response:
   *    properties:
   *      message:
   *        type: string
   *      data:
   *        $ref: '#/definitions/Profile'
   */
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
