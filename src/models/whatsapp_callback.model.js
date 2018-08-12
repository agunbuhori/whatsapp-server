// whatsapp_callback-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const whatsappCallback = new Schema({
    messages: [
      {
        id: { type: String },
        body: { type: String },
        type: { type: String },
        senderName: { type: String },
        fromMe: { type: Boolean },
        author: { type: String },
        time: { type: Number },
        chatId: { type: String },
        messageNumber: { type: String },
        status: { type: String },
      }
    ],
    ack: [
      {
        id: { type: String },
        queueNumber: { type: String },
        chatId: { type: String },
        status: { type: String },
      }
    ],
  }, {
    timestamps: true
  });

  return mongooseClient.model('whatsappCallback', whatsappCallback);
};
