const docs = require('./lib/documentation');
const {app} = require('./config');

// swagger definition
var apiDefinition = {
  info: {
    title: 'Node Template API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: app.baseUrl,
  basePath: '/api/v1',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: apiDefinition,
  // path to the API docs
  apis: ['./server/routes/**/*.js'],
};

// initialize swagger-jsdoc
module.exports = docs(options);
