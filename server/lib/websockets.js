const io = require('socket.io');
let sockets = null;

const self = module.exports = {

  webSockets() {
    return sockets;
  },

  init(httpServer) {

    if (httpServer) {
      sockets = io(httpServer);
    }

    return self.webSockets();
  }

};
