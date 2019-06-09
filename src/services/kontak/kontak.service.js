module.exports = function (app) {
  app.get('/kontak/:type/:division', function(req, res) {
    let hour = new Date().toLocaleString('en-US', {timeZone: 'Asia/Jakarta', hour: '2-digit', hour12: false})
    let minute = new Date().toLocaleString('en-US', {timeZone: 'Asia/Jakarta', minute: '2-digit'})
    let currentTime = parseFloat(hour+'.'+minute)

    app.service('v2/message_servers').find({
      query: {
        $sort: {
          counter: 1
        },
        $limit: 1,
        isActive: true,
        onlineAt: {
          $lte: currentTime
        },
        offlineAt: {
          $gte: currentTime
        },
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
        res.redirect('https://wa.me/123456?text=' + encodeURIComponent('Mohon maaf, saat ini semua cs sedang tidak aktif'))
      }
    })
  })
}
