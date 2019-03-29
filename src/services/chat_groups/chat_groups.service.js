// Initializes the `chat_groups` service on path `/v2/chat_groups`
const createService = require('feathers-mongoose')
const createModel = require('../../models/chat_groups.model')
const hooks = require('./chat_groups.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/v2/chat_groups', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('v2/chat_groups')

  service.hooks(hooks)
}
