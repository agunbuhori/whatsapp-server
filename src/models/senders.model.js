// whatsapp_callback-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const senders = new Schema({
    type: { type: String, enum: ['whatsapp', 'sms', 'email'], default: 'whatsapp' },
    name: String,
    target: String,
    url: String,
    token: String,
  }, {
    timestamps: true
  });

  return mongooseClient.model('senders', senders);
};
