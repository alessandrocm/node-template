const http = require('http');
const express = require('express');
const Root = require('./routes');
const bodyParser = require('body-parser');
const morgan = require('./middleware/morgan');
const requestId = require('./middleware/requestId');
const responses = require('./middleware/responses');
const cors = require('./middleware/cors');
const services = require('./middleware/services');
const errors = require('./middleware/errors');
const notFound = require('./middleware/notFound');
const database = require('./lib/database');
const appConfig = require('./config').app;

require('./lib/utils/Array');

class App {

  constructor() {
    this.init();
    this.middleware();
    this.routes();
  }

  init() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  middleware() {
    this.app.use(cors);
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(requestId);
    this.app.use(responses);
    this.app.use(services);
    this.app.use(morgan);
  }

  routes() {
    this.app.use('/', (new Root()).router);
    this.app.use(errors);
    this.app.use(notFound);
  }

  shutdown() {
    database.close();
    this.server.close();
  }

}

module.exports = App;
