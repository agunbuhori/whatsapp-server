const { Client } = require('../../providers/whatsapp-web.js/index')

const client = new Client({puppeteer: {headless: false}});
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

client.initialize();

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
})

client.on('ready', () => {
    console.log('READY');
});

client.on('disconnected', () => {
    console.log('Client was logged out');
})

module.exports = function (app) {
  client.on('message', async msg => {

    console.log('MESSAGE RECEIVED', msg)

    let msgFrom = msg.from.split('@')
    let msgAuthor = msg.author.split('@')
    let isGroup = (msgFrom[1]==='g.us')
    let msgTo = msg.to.split('@')

    let message = {
      consumer: 'webhooks',
      type: 'whatsapp',
      isGroup: isGroup,
      from: {
        isMe: false,
        target: (isGroup) ? msgFrom[0] : msgAuthor[1],
        name: 'tess',
      },
      to: {
        target: msgTo[0],
        name: 'tes',
      },
      message: {
        body: msg.body,
        type: msg.type,
      },
      status: {
        isSent: true,
        isDelivered: true,
      },
    }

    app.service('v2/messages').create(message).then(messages => console.log(messages));
  });

  app.get('/', function(req, res) {
    res.send('hello world');
  });
}
