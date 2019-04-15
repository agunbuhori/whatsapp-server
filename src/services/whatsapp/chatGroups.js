module.exports = function (client, app) {
  app.use('/v2/chat_groups/:groupId/participants', {
    find(params) {
      return client.getParticipantsById(params.route.groupId)
    },
    create(data, params) {
      if (data.command==='add') {
        return client.addParticipantsById(params.route.groupId, data.data)
      } else if (data.command==='remove') {
        return client.removeParticipantsById(params.route.groupId, data.data)
      } else if (data.command==='promote') {
        return client.promoteParticipantsById(params.route.groupId, data.data)
      } else if (data.command==='demote') {
        return client.demoteParticipantsById(params.route.groupId, data.data)
      }
    }
  })
}
