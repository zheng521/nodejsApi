const PostModel = require('../models/posts')
const LinkModel = require('../models/links')

module.exports = function (app) {
  app.get('/api/posts', function(req, res, next) {
    const author = req.query.author
    // PostModel.getPosts(author)
    //   .then(function (posts) {
    //     res.json(posts)
    //   })
    LinkModel.getLinks().then(function (links) {
      res.json(links)
    })
      .catch(next)
    // res.json({12:123})
  })
}
