require('dotenv').config();
const request = require('request-promise');

function saveToMessages() {
  return function (hook) {
    if (typeof hook.data.messages != undefined) {
      var i;
      for (i = 0; i < hook.data.messages.length; i++) {
        if (!hook.data.messages[i].fromMe) {
          hook.app.service('v2/messages').create({
            service: {
              id: 'push_notification',
              name: 'Push notification',
            },
            from: {
              isMe: hook.data.messages[i].fromMe,
              target: hook.data.messages[i].author,
              name: hook.data.messages[i].senderName,
            },
            to: {
              isGroup: false,
              target: process.env.WA_NUMBER,
              name: 'HSI Center',
            },
            message: {
              subject: 'No Subject',
              body: hook.data.messages[i].body,
            }
          })
          .then(result => sendToWebhooks(result));
        }
      }
    }
    return hook;
  };
}

function sendToWebhooks(result) {
  return request({
    method: 'GET',
    url: process.env.API_GATEWAY_URL + '/v2/webhooks',
    qs: { type: 'messages', $limit: 50 },
    headers: { Authorization : process.env.API_GATEWAY_ACCESS_TOKEN },
  }).then(function(response) {
    webhooks = JSON.parse(response);
    if (typeof webhooks.data !== 'undefined' && webhooks.data.length > 0) {
      var i;
      for (i = 0; i < webhooks.data.length; i++) {
        request({
          method: 'POST',
          url: webhooks.data[i].url,
          headers: webhooks.data[i].headers,
          body: result,
          json: true,
        }).then(message => console.log(message));
        console.log(message.data[i]);
      }
    }
  });
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      saveToMessages(),
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
