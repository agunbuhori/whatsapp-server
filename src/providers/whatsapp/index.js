/* eslint-disable no-console no-unused-vars */
require('dotenv').config()
const express = require('@feathersjs/express')
const logger = require('../../logger')
const app = require('../app')
const messages = require('../../services/messages/messages.service.js')
const webhooks = require('../../services/webhooks/webhooks.service.js')
const receive = require('./receive')
const sent = require('./sent')
const Client = require('./web.whatsapp.com')

const client = new Client({puppeteer: {headless: false}})
client.initialize()

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr)
})

client.on('authenticated', (session) => {
  console.log('AUTHENTICATED', session)
})

client.on('auth_failure', msg => {
  console.error('AUTHENTICATION FAILURE', msg)
})

client.on('ready', () => {
  console.log('READY')
})

client.on('message', async msg => {
  console.log('MESSAGE RECEIVED', msg)
})

client.on('disconnected', () => {
  console.log('Client was logged out')
})

app.configure(messages)
app.configure(webhooks)
receive(client, app)
sent(client, app)
app.use('/v2/whatsapp_commands', {
  create(data, params) {
    if (data.token && data.command) {
      return client.callStore(data.token, data.command)
    }
  }
})

app.use(express.notFound())
app.use(express.errorHandler({ logger }))

const host = process.env.WA_HOST || 'localhost'
const port = process.env.WA_PORT || 3029
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', host, port)
)
