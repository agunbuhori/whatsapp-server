// whatsapp_callback-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const messageServers = new Schema({
    type: { type: String, enum: ['whatsapp', 'sms', 'email'], default: 'whatsapp' },
    division: { type: String, default: 'cs' },
    greetingMessage: { type: String, default: 'السلام عليكم' },
    number: { type: Number, required: true },
    name: { type: String },
    description: { type: String },
    onlineAt: { type: Number, default: 0 },
    offlineAt: { type: Number, default: 24 },
    counter: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  }, {
    timestamps: true
  })

  return mongooseClient.model('message_servers', messageServers)
}
