require('dotenv').config();
var request = require('request-promise');

var email = {

  getQueue: function() {
    return request({
      method: 'GET',
      url: process.env.API_GATEWAY_URL + '/v2/messages',
      qs: { 'type': 'email', 'status.isSent': false, '$limit': 1 },
    }).then(function(response) {
      message = JSON.parse(response);
      if (typeof message.data !== 'undefined' && message.data.length > 0) {
        data = message.data[0];
      } else {
        data = null
      }
      return data;
    });
  },

  processQueue: function(body) {
    if (body !== null) {

      bodyRequest = { 
        from: { name: body.from.name, email: body.from.target },
        personalizations: [ { to: [ { email: body.to.target } ] } ],
        subject: body.message.subject,
        content: [ { type: 'text/html', value: body.message.body } ]
      };

      return request({
        method: 'POST',
        url: process.env.EMAIL_URL + '/v3/mail/send',
        body: bodyRequest,
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.EMAIL_API_KEY },
        resolveWithFullResponse: true,
        json: true 
      }).then(function(response) {
        if (response.statusCode===202) {
          return {id: body._id, isSent: true, isError: false, errorMessage: null};
        } else {
          return {id: body._id, isSent: true, isError: true, errorMessage: response.body};
        }
      }).catch(function(error) {
        return {id: body._id, isSent: true, isError: true, errorMessage: error.body};
      });
    } else {
      return {id: null};
    }
  },

  updateStatus: function(body) {
    if (body.id !== null) {
      return request({
        method: 'PATCH',
        url: process.env.API_GATEWAY_URL + '/v2/messages/' + body.id,
        body: { status: { isSent: body.isSent, isError: body.isError, errorMessage: body.errorMessage } },
        headers: { 'Content-Type': 'application/json' },
        json: true 
      });
    }
  }
}

setInterval(function (){
  email.getQueue()
  .then(email.processQueue)
  .then(email.updateStatus)
  .catch(err => console.log(err));
}, 500);
