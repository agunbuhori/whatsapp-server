const request = require('request-promise')
module.exports = function (client, app) {

  client.onMessage(msg => {
    let msgFrom = msg.from.split('@')
    let isGroup = (msgFrom[1]==='g.us') ? true : false
    let msgTo = msg.to.split('@')

    if (msgFrom[0]!=='status') {
      let message = {
        consumer: 'webhooks',
        type: 'whatsapp',
        isGroup: isGroup,
        isInboundMessage: true,
        from: {
          id: msg.from,
          number: msgFrom[0],
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
          isError: false,
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
    }
  })
}
