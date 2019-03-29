// whatsapp_callback-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const contacts = new Schema({
    type: { type: String, enum: ['whatsapp', 'sms', 'email'], default: 'whatsapp' },
    id: String,
    name: String,
    number: String,
    address: String,
  }, {
    timestamps: true
  })

  return mongooseClient.model('contacts', contacts)
}
