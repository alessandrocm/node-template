const db = require('../config').db;
const log = require('./logs');
const guid = require('./guid');
let client = null;

if (db.client === 'postgres') {
  require('./postgres/setBigIntParser')();
}

function initialize() {
  return require('knex')({
    client    : db.client,
    connection: {
      host     : db.server,
      user     : db.username,
      password : db.password,
      database : db.name,
      acquireConnectionTimeout : db.acquireConnTimeout
    },
    pool : { min: db.minConn, max: db.maxConn }
  });
}

const self = module.exports = {

  client() {
    if (!client) {
      client = initialize();
    }

    return client;
  },

  transaction(scope = (trx) => Promise.resolve(), trxId = guid()) {

    return self.client().transaction(trx =>
      log.info(`Trasaction ${trxId} created.`) ||
      scope(trx)
        .then(result => {
          log.info(`Committing transaction ${trxId}`);
          return result;
        })
        .catch(err => {
          log.error(`Error in transaction ${trxId} : ${err.message}`);
          log.error(err.stack);
          return Promise.reject(err);
        })
    );

  },

  query(tableName, timeout) {

    return self.client()(tableName)
      .timeout(timeout || db.timeout)
    ;

  },

  rawQuery(sql = '', bindings = []) {

    return self.client().raw(sql, bindings);

  },

  close() {
    
    if (client) {
      client.destroy(err => {
        if (err) {
          log.error(err);
        }

        client = null;
        log.info('db client connection closed.');
      });
    }

  }

};
