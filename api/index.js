const PostModel = require('../models/posts')
const LinkModel = require('../models/links')
const NewsModel = require('../models/news')

module.exports = function (app) {
  app.get('/api/entrance', function(req, res, next) {
    Promise.all([
        LinkModel.getLinks(),
        NewsModel.getNews()
    ]).then((data) => {
        res.json({
            code: 200,
            data:[{category:'suggests', items: data[1]},{category:'advertisements',items: data[0]}],
            msg:''
        })
    })
    .catch(next)
  })
}
