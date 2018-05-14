const App = require('../../server/app');
let app;

exports.instance = function() {
  if (!app) {
    app = new App();
  }

  return app;
};

exports.shutdown = function() {
  app.shutdown();
  app = null;
}
