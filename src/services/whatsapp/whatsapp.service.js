const request = require('request-promise')
const { Client } = require('../../providers/whatsapp-web.js/index')
const receive = require('./receive')
const sent = require('./sent')
const chatGroups = require('./chatGroups')

const client = new Client({puppeteer: {headless: false}})
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

client.initialize()

client.on('qr', (qr) => {
  // NOTE: This event will not be fired if a session is specified.
  console.log('QR RECEIVED', qr)
})

client.on('authenticated', (session) => {
  console.log('AUTHENTICATED', session)
})

client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessfull
  console.error('AUTHENTICATION FAILURE', msg)
})

client.on('ready', () => {
  console.log('READY')
})

client.on('disconnected', () => {
  console.log('Client was logged out')
})

module.exports = function (app) {
  receive(client, app)
  sent(client, app)
  chatGroups(client, app)
}
