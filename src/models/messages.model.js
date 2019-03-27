require('dotenv').config();
// messages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const messages = new Schema({
    consumer: { type: String, default: 'registration' },
    type: { type: String, enum: ['whatsapp', 'sms', 'email'], default: 'whatsapp' },
    isGroup: { type: Boolean, default: false },
    from: {
      isMe: { type: Boolean, default: true },
      target: { type: String, default: process.env.WA_NUMBER },
      name: { type: String, default: process.env.WA_NAME },
    },
    to: {
      target: { type: String, required: true },
      name: { type: String, required: true },
    },
    message: {
      subject: { type: String, default: 'No Subject' },
      body: { type: String, required: true },
      type: { type: String, enum: ['chat', 'audio', 'ptt', 'image', 'video', 'document', 'sticker']},
      mimeType: { type: String },
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
