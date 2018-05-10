const { child } = require('./logs');
const { series } = require('./funcs');

function validateEvent(event) {
  if (!event || typeof event !== 'object' || Array.isArray(event)) {
    throw new Error('Event must be an object');
  }
  if (typeof event.type === 'undefined') {
    throw new Error('Event must have a type');
  }
  if (typeof event.identifier === 'undefined') {
    throw new Error('Event must have an identifier');
  }
}

function relayEvent(event, observer) {
  return new Promise((resolve, reject) => {
    observer(event);
    resolve();
  });
}

function relay(event, relays) {

  const {identifier} = event;
  const log = child({identifier});

  relays.forEach(observer => {
    relayEvent(event, observer)
      .catch(log.error)
    ;
  });

}

module.exports = function createRelay() {

  const relays = [];

  return {
    dispatch: (event) => {

      validateEvent(event);
      relay(event, relays);

    },
    register: (...observers) => {

      if (observers.length === 0) {
        return;
      }

      observers.forEach(observer => relays.push(observer));

    }
  };

}
