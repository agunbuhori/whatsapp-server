const request = require('request-promise')
const { Client } = require('../../providers/whatsapp-web.js/index')

const client = new Client({puppeteer: {headless: false}})
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

client.initialize()

client.on('qr', (qr) => {
  // NOTE: This event will not be fired if a session is specified.
  console.log('QR RECEIVED', qr)
})

client.on('authenticated', (session) => {
  console.log('AUTHENTICATED', session)
})

client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessfull
  console.error('AUTHENTICATION FAILURE', msg)
})

client.on('ready', () => {
  console.log('READY')
})

client.on('disconnected', () => {
  console.log('Client was logged out')
})

module.exports = function (app) {
  client.on('message', async msg => {
    // console.log('MESSAGE RECEIVED', msg)

    let msgFrom = msg.from.split('@')
    let msgAuthor = (msg.author) ? msg.author.split('@') : ['']
    let isGroup = (msgFrom[1]==='g.us') ? true : false
    let msgTo = msg.to.split('@')

    let message = {
      consumer: 'webhooks',
      type: 'whatsapp',
      isGroup: isGroup,
      isInboundMessage: true,
      from: {
        id: msg.from,
        number: (isGroup) ? msgAuthor[0] : msgFrom[0],
      },
      to: {
        id: msg.to,
        number: msgTo[0],
      },
      message: {
        type: msg.type,
        body: msg.body,
      },
      status: {
        isSent: true,
        isDelivered: true,
      },
    }
    app.service('v2/messages').create(message).then(messages => {
      app.service('v2/webhooks').find({
        query: {
          endPoint: '/v2/messages'
        }
      }).then(webhooks => {
        if (typeof webhooks.data !== 'undefined' && webhooks.data.length > 0) {
          var i;
          for (i = 0; i < webhooks.data.length; i++) {
            request({
              method: 'POST',
              url: webhooks.data[i].callbackUrl,
              headers: webhooks.data[i].callbackHeaders,
              body: messages,
              json: true,
            }).then(message => console.log(message));
          }
        }
      })
    })
  })

  app.post('/v2/whatsapp/synchronize/contacts', function(req, res) {
    res.send('Contacts synchronized')
  })
  app.post('/v2/whatsapp/synchronize/chat_groups', function(req, res) {
    res.send('Chat groups synchronized')
  })
  app.post('/v2/whatsapp/synchronize/messages', function(req, res) {
    res.send('Messages synchronized')
  })
}
