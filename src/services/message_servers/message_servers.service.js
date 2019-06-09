// Initializes the `message_servers` service on path `/v2/message_servers`
const createService = require('feathers-mongoose')
const createModel = require('../../models/message_servers.model')
const hooks = require('./message_servers.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/v2/message_servers', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('v2/message_servers')

  service.hooks(hooks)
}
