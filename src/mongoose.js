require('dotenv').config()
const mongoose = require('mongoose')

module.exports = function (app) {
  mongoose.connect(process.env.DB, { useNewUrlParser: true })
  mongoose.Promise = global.Promise

  app.set('mongooseClient', mongoose)
}
