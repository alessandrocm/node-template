
const app = {
  name        : 'node-template',
  environment : process.env.NODE_ENV || 'development',
  port        : process.env.PORT || 3000,
  website     : process.env.WEBSITE,
  appEmail    : process.env.EMAIL,
  logLevel    : process.env.LOG_LEVEL || 'info',
  corsOrigin  : !!process.env.CORS_ORIGIN || true
};

const db = {
  client            : process.env.DB_CLIENT || 'postgres',
  name              : process.env.DB_NAME,
  username          : process.env.DB_USERNAME,
  password          : process.env.DB_PASSWORD,
  server            : process.env.DB_SERVER,
  port              : process.env.DB_PORT || 5432,
  maxConn           : process.env.DB_MAX_CONNECTIONS || 10,
  minConn           : process.env.DB_MIN_CONNECTIONS || 2,
  timeout           : process.env.DB_TIMEOUT || 5000,
  acquireConnTimeout: process.env.DB_AQUIRE_CONN_TIMEOUT || 20000
};

const security = {
  saltRounds      : process.env.SALT_ROUNDS || 12,
  tokenExpiration : process.env.TOKEN_EXP || 3600,
  tokenSecret     : process.env.TOKEN_SECRET || 'Han Solo Dies'
};

const google = {
  clientID    : process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
};

const sendgrid = {
  apiKey   : process.env.SENDGRID_API_KEY
};

module.exports = {
  app,
  db,
  security,
  google,
  sendgrid
};
