require('dotenv').config()

/* eslint-disable no-console */
const logger = require('./logger')
const app = require('./app')
const host = process.env.APP_HOST
const port = process.env.APP_PORT
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', host, port)
)
