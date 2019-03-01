const senders = require('./senders/senders.service.js');
const messages = require('./messages/messages.service.js');
const whatsappCallback = require('./whatsapp_callback/whatsapp_callback.service.js');
const broadcast = require('./broadcast/broadcast.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(senders);
  app.configure(messages);
  app.configure(whatsappCallback);
  app.configure(broadcast);
};
