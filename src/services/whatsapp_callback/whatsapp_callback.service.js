// Initializes the `whatsapp_callback` service on path `/v2/whatsapp_callback`
const createService = require('feathers-mongoose');
const createModel = require('../../models/whatsapp_callback.model');
const hooks = require('./whatsapp_callback.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/v2/whatsapp_callback', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('v2/whatsapp_callback');

  service.hooks(hooks);
};
