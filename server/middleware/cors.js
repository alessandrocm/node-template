const cors = require('cors');
const { app } = require('../config');

module.exports = cors({
  origin: app.corsOrigin
});
