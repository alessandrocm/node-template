require('dotenv').config({path : '.env'});

const App = require('./app');
const { app } = require('./config');
const log = require('./lib/logs');

const application = new App();

application.server.listen(app.port, err => {
  if (err) {
    return log.error(err);
  }

  log.info(`App is listening on port ${app.port} process ${process.pid}`);
});

process.on('uncaughtException', err => {
  console.error(err);
  application.shutdown();
  process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  application.shutdown();
  process.exit(1);
});
