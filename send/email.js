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

      if (body.attachment.name !== null && body.attachment.data !== null) {
        endPoint = '/sendFile';
        bodyMessage = body.attachment.data;
      } else {
        endPoint = '/sendMessage';
        bodyMessage = body.message.body;
      }

      if (body.to.isGroup) {
        bodyRequest = { 'chatId': body.to.target, 'body': bodyMessage, 'filename': body.attachment.name };
      } else {
        bodyRequest = { 'phone': body.to.target, 'body': bodyMessage, 'filename': body.attachment.name };
      }

      return request({
        method: 'POST',
        url: process.env.WA_URL + endPoint + '?token=' + process.env.WA_TOKEN,
        body: bodyRequest,
        headers: { 'Content-Type': 'application/json' },
        json: true 
      }).then(function(response) {
        if (response.sent) {
          return {id: body._id, isSent: true, isError: false, errorMessage: null};
        } else {
          return {id: body._id, isSent: true, isError: true, errorMessage: response.message};
        }
      }).catch(function(error) {
        return {id: body._id, isSent: true, isError: true, errorMessage: error.message};
      });
    } else {
      return {id: null};
    }
  },

  updateStatus: function(body) {
    console.log(body);
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
}, 5000);
