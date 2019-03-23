const express = require('express');
const router = express.Router();

const io = require('../ws');

const ioChannels = {};

function assignIoChannel(name) {
  const channelIo = io
    .of(`/channel-${name}`)
    .on('connect', function connect(socket) {
      socket.emit('connected', {name});
      socket.emit('data', db.channels.find((channel) => channel.name === name));
    });

  ioChannels[name] = channelIo;
}

function createChannel(name) {
  assignIoChannel(name);
  return {
    name,
    messages: [],
  };
}

function createMessage(text) {
  return {
    timestamp: new Date().toISOString(),
    text: `${text}`.trim(),
  };
}

function sortByDate(a, b) {
  return new Date(a.timestamp) - new Date(b.timestamp);
}

const db = {
  channels: [
    createChannel('general'),
    createChannel('trade'),
    createChannel('group'),
    createChannel('guild'),
  ],
};

router.get('/channels', function (req, res, next) {
  const list = db.channels.map(({name, messages}) => ({
    name,
    count: messages.length,
  }));

  return res.json(list);
});

router.get('/messages/:channel', function (req, res, next) {
  const name = req.params.channel;

  const channel = db.channels.find(channel => channel.name === name);

  if (!channel) {
    return res.status(404).json({msg: `${name} channel doesn't exist`});
  }

  return res.json({
    name: channel.name,
    messages: channel.messages.sort(sortByDate),
  });
});

router.put('/:channel', function (req, res, next) {
  const name = req.params.channel;
  const channel = db.channels.find(channel => channel.name === name);

  if (!channel) {
    return res.status(404).json({msg: `${name} channel doesn't exist`});
  }

  const message = createMessage(req.body.message);

  if (ioChannels[name]) {
    ioChannels[name].emit('message', message);
  }

  channel.messages.push(message);

  return res.status(201).end();
});

module.exports = router;
