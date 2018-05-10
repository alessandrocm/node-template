const log = require('../lib/logs');

function loadService(name) {

  try {

    return require(`./${name}`);

  } catch (err) {
    log.error(err);
    return null;
  }

}

module.exports = function factoryService(context) {
  return (name, ...args) => {
    const Service = loadService(name);

    try {

      return new Service(context, ...args);

    } catch (err) {
      log.error(err);
      return null;
    }

  };
};
