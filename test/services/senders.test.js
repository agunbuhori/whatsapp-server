const assert = require('assert')
const app = require('../../src/app')

describe('\'senders\' service', () => {
  it('registered the service', () => {
    const service = app.service('v2/senders')

    assert.ok(service, 'Registered the service')
  })
})
