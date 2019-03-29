require('dotenv').config()
const mongoose = require('mongoose')

module.exports = function (app) {
  mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
  mongoose.Promise = global.Promise

  app.set('mongooseClient', mongoose)
}
