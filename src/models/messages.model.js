require('dotenv').config()
// messages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const messages = new Schema({
    consumer: { type: String, default: 'registration' },
    type: { type: String, enum: ['whatsapp', 'sms', 'email'], default: 'whatsapp' },
    isGroup: { type: Boolean, default: false },
    isInboundMessage: { type: Boolean, default: false },
    from: {
      id: { type: String },
      number: { type: String },
      name: { type: String },
    },
    to: {
      id: { type: String },
      number: { type: String },
      name: { type: String },
    },
    message: {
      type: { type: String },
      body: { type: String, required: true },
      mimeType: { type: String },
      caption: { type: String },
      subject: { type: String },
    },
    status: {
      isSent: { type: Boolean, default: false },
      isError: { type: Boolean, default: false },
      errorMessage: String,
    },
  }, {
    timestamps: true
  })

  return mongooseClient.model('messages', messages)
}
