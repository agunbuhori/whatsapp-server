const compress = require('compression')
const helmet = require('helmet')
const logger = require('../logger')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')

const mongoose = require('../mongoose')

const app = express(feathers())

// Load app configuration
app.configure(configuration())
app.use(helmet())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set up Plugins and providers
app.configure(express.rest())

app.configure(mongoose)

module.exports = app
