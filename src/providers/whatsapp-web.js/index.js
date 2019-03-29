'use strict'

module.exports = {
  Client: require('./src/Client'),

  version: '0.1.1',

  // Structures
  Chat: require('./src/structures/Chat'),
  PrivateChat: require('./src/structures/PrivateChat'),
  GroupChat: require('./src/structures/GroupChat'),
  Message: require('./src/structures/Message')
}
