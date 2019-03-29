// whatsapp_callback-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const webhooks = new Schema({
    description: { type: String, required: true },
    endPoint: { type: String, default: '/v2/messages' },
    method: { type: String, default: 'POST' },
    callbackUrl: { type: String, required: true },
    callbackHeaders: Schema.Types.Mixed,
    isActive: { type: Boolean, default: true },
  }, {
    timestamps: true
  });

  return mongooseClient.model('webhooks', webhooks);
};
