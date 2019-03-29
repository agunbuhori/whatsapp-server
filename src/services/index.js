const whatsapp = require('./whatsapp/whatsapp.service.js');
const contacts = require('./contacts/contacts.service.js');
const messages = require('./messages/messages.service.js');
const webhooks = require('./webhooks/webhooks.service.js');
// const broadcast = require('./broadcast/broadcast.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(whatsapp);
  app.configure(contacts);
  app.configure(messages);
  app.configure(webhooks);
  // app.configure(broadcast);
};
