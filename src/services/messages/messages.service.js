// Initializes the `messages` service on path `/v2/messages`
const createService = require('feathers-mongoose');
const createModel = require('../../models/messages.model');
const hooks = require('./messages.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/v2/messages', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('v2/messages');

  service.hooks(hooks);
};
