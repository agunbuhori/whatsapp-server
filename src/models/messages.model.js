require('dotenv').config();
// messages-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const messages = new Schema({
    type: { type: String, enum: ['whatsapp', 'sms', 'email'], default: 'whatsapp' },
    from: {
      isMe: { type: Boolean, default: true },
      target: { type: String, default: process.env.WA_NUMBER },
      name: { type: String, default: process.env.WA_NAME },
    },
    to: {
      isGroup: { type: Boolean, required: true },
      target: { type: String, required: true },
      name: { type: String, required: true },
    },
    message: {
      subject: { type: String, default: 'No Subject' },
      body: { type: String, required: true },
    },
    attachment: {
      name: { type: String, default: null },
      data: { type: String, default: null },
    },
    status: {
      isSent: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      isCanceled: { type: Boolean, default: false },
      isError: { type: Boolean, default: false },
      errorMessage: String,
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('messages', messages);
};
