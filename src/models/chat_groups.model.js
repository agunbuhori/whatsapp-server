require('dotenv').config()
// chatGroups-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const participants = new Schema({
    id: { type: String },
    number: { type: String },
    name: { type: String },
    isAdmin: { type: Boolean, default: false },
  })

  const chatGroups = new Schema({
    groupId: { type: String },
    type: { type: String, enum: ['whatsapp', 'telegram', 'line'], default: 'whatsapp' },
    name: { type: String },
    description: { type: String },
    creator: {
      id: { type: String },
      number: { type: String, default: process.env.WA_NUMBER },
      name: { type: String },
    },
    participants: [participants],
  }, {
    timestamps: true
  })

  return mongooseClient.model('chatGroups', chatGroups)
}
