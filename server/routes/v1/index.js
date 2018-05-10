const express = require('express');
const profileRoutes = require('./profiles');

module.exports = function v1Routes() {
  const router = express.Router();

  router.use('/profiles', profileRoutes());

  return router;
};
