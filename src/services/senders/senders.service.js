// Initializes the `senders` service on path `/v2/senders`
const createService = require('feathers-mongoose');
const createModel = require('../../models/senders.model');
const hooks = require('./senders.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/v2/senders', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('v2/senders');

  service.hooks(hooks);
};
