'use strict';
//task1
const EventEmitter = require('node:events');
class EE extends EventEmitter {}
const ee = new EE();

ee.on('tick', n => {
  console.log('Tick - ', n);
});

const setTimer = sec => {
  let n = 0;
  const timerId = setInterval(() => ee.emit('tick', ++n), 1000);
  setTimeout(() => clearInterval(timerId), (sec + 1) * 1000);
};

//task2
const user = new EE();
const sendMessage = (username, message) => {
  user.emit('messageReady', username, message);
  console.log('sentMessage: ', message);
};
const receiveMessage = (username, message) => {
  console.log(`Сooбщение от ${username}: ${message}`);
};
user.on('messageReady', receiveMessage);

module.exports = { setTimer, sendMessage };
