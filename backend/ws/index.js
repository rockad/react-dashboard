const io = require('socket.io')({path: '/ws'});

module.exports = io;
