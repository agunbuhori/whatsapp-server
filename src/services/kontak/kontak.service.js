module.exports = function (app) {
  app.get('/kontak/:type/:division', function(req, res) {
    app.service('v2/message_servers').find({
      query: {
        $sort: {
          counter: 1
        },
        $limit: 1,
        isActive: true,
        type: req.params.type.toLowerCase(),
        division: req.params.division.toLowerCase(),
      },
    }).then(results => {
      if (results.data.length===1) {
        app.service('v2/message_servers').patch(results.data[0]._id, {
          counter: results.data[0].counter+1
        }).then(result => {
          let greetingMessage = '?text=' + encodeURIComponent(result.greetingMessage)
          res.redirect('https://wa.me/' + result.number + greetingMessage)
        })
      } else {
        res.redirect('https://wa.me/123456')
      }
    })
  })
}
