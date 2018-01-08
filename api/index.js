const PostModel = require('../models/posts')
const LinkModel = require('../models/links')
const NewsModel = require('../models/news')

module.exports = function (app) {
  app.get('/api/entrance', function(req, res, next) {
    // const author = req.query.author
    // PostModel.getPosts(author)
    //   .then(function (posts) {
    //     res.json(posts)
    //   })
    let links, recommended;
    // LinkModel.getLinks().then((links)=>{
    //   links = links
    //   res.json({category:'advertisements',items: links})
    // })
    NewsModel.getNews().then((news) => {
      res.json({category:'advertisements',items: news})
    })
      .catch(next)
    // res.json({12:123})
  })
}
