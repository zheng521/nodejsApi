const PostModel = require('../models/posts')
const LinkModel = require('../models/links')
const NewsModel = require('../models/news')
const UserModel = require('../models/users')
const sha1 = require('sha1')

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
  app.post('/api/mr_login', function(req,res,next) {
      let username = req.body.username
      let password = req.body.password
      UserModel.getUserByName(username).then((user) => {
        if(!user) {
          res.json({
            code: 401,
            data:'',
            msg:'用户不存在'
          })
        }
        if(sha1(password) !== user.password) {
          res.json({
            code: 401,
            data:'',
            msg:'密码错误'
          })
      } else {
          res.json({
            code: 200,
            data:{accessToken: },
            msg:'登录成功'
          })
        }
      })
      .catch(next)
  })
  app.post('/api/mr_signup', function(req,res,next) {
    let username = req.body.username
    let password = req.body.password
    password = sha1(password)
    UserModel.create({name: username, password: password}).then((result) => {
      res.json({
        code: 200,
        data:'',
        msg:'注册成功'
      })
    })
  })
}
