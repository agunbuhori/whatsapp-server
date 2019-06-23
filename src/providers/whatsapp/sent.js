module.exports = function (client, app) {
  setInterval(function (){
    app.service('v2/messages').find({
      query: {
        type: 'whatsapp',
        isInboundMessage: false,
        'status.isSent': false,
        $limit: 1
      }
    }).then(messages => {
      if (typeof messages.data !== 'undefined' && messages.data.length > 0) {
        let id = messages.data[0]._id
        let chatId = (typeof messages.data[0].to.id !== 'undefined') ? messages.data[0].to.id : messages.data[0].to.number+'@c.us'
        let body = messages.data[0].message.body

        client.sendMessage(chatId, body)
          .then((m) => {
            app.service('v2/messages').patch(id, {
              status: {
                isSent: true,
                isError: false
              }
            })
          }).catch((e) => {
            app.service('v2/messages').patch(id, {
              status: {
                isSent: true,
                isError: true,
                errorMessage: e,
              }
            })
          })
      }
    })
  }, 3000)
}
