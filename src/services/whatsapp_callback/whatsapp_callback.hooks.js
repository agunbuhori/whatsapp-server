// require('dotenv').config();
// const request = require('request-promise');

// function sentToWebhook() {
//   return function (hook) {
//     return hook.app.service('v2/webhooks').find({query: {$limit: 0}})
//       .then(function (result) {
//         for(var i = 0; i < result.total; i++){
//           hook.app.service('v2/webhooks').find({query: {$limit: 1, $skip: i}})
//             .then(function (result) {
//               request({
//                 method: 'POST',
//                 url: result.data[0].url,
//                 headers: result.data[0].headers,
//                 body: hook.result,
//                 json: true
//               }).then(message => console.log(message));
//             });
//         }
//         return hook;
//       });
//   };
// }

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
