const messages = require('./messages/messages.service.js');
const whatsappCallback = require('./whatsapp_callback/whatsapp_callback.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(messages);
  app.configure(whatsappCallback);
};
