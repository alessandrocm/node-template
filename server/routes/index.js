const express = require('express');
const docs = require('./docs');
const v1Routes = require('./v1');

class Root {

  constructor() {
    this.init();
    this.middleware();
    this.routes();
  }

  init() {
    this.router = express.Router();
  }

  middleware() {

  }

  routes() {
    this.router.use('/api/v1', v1Routes());
    this.router.use('/api', v1Routes()); // Default routes
    this.router.use('/api', docs());
  }

}

module.exports = Root;
