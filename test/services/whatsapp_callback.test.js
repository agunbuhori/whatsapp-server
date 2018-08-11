const assert = require('assert');
const app = require('../../src/app');

describe('\'whatsapp_callback\' service', () => {
  it('registered the service', () => {
    const service = app.service('v2/whatsapp_callback');

    assert.ok(service, 'Registered the service');
  });
});
