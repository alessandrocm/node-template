const express = require('express');
const spec = require('../spec');

module.exports = function docs() {

    const router = express.Router();
    router.get('/', function getDocs(req, res, next) {
      res.setHeader('Content-Type', 'application/json');
      res.send(spec);
    });

    return router;

};
