module.exports = function (app) {
  app.use('/v2/broadcast', {
    create(data, params) {
      let recipients = data.recipients
      let queues = []
      for (let i = 0; i < recipients.length; i++) {
        let message = data.message
        for(let k in recipients[i]) {
          message = message.replace('{'+k+'}', recipients[i][k])
        }
        queues[i] = {}
        queues[i].phone = recipients[i].phone
        queues[i].name = recipients[i].name
        queues[i].message = message
        app.service('v2/messages').create({
          service: {
            id: "broadcast",
            name: "broadcast",
          },
          to: {
            isGroup: false,
            target: queues[i].phone,
            name: queues[i].name,
          },
          message: {
            body: queues[i].message,
          }
        })
      }
      return Promise.resolve({message: 'Queued. Thank you.', queues: queues});
    }
  });
}
