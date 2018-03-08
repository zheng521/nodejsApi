const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const api = require('./api')
const pkg = require('./package')
const winston = require('winston')
const expressWinston = require('express-winston')
const bodyParser = require('body-parser');
// const cors = require('cors')

const app = express()

app.set('superSecret', config.secret);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api(app)

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
// app.use(express.static(path.join(__dirname, 'public')))

// app.use(session({
// 	name: config.session.key,
// 	secret: config.session.secret,
// 	resave: true,
// 	saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
// 	cookie: {
// 		maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
// 	},
// 	store: new MongoStore({// 将 session 存储到 mongodb
// 		url: config.mongodb// mongodb 地址
// 	})
// }))

// app.use(flash())
// app.use(require('express-formidable')({
// 	uploadDir: path.join(__dirname, 'public/img'),
// 	keepExtensions: true
// }))
//
// app.locals.blog = {
// 	title: pkg.name,
// 	description: pkg.description
// }


// app.use(cors({
//   origin: 'http://localhost:3000/posts',
//   credentials: true
// }))

// app.use(function (req, res, next) {
// 	res.locals.user = req.session.user
// 	res.locals.success = req.flash('success').toString()
// 	res.locals.error = req.flash('error').toString()
// 	next()
// })



// 正常请求的日志
// app.use(expressWinston.logger({
//   transports: [
//     new (winston.transports.Console)({
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       filename: 'logs/success.log'
//     })
//   ]
// }))
// routes(app)
// 错误请求的日志
// app.use(expressWinston.errorLogger({
//   transports: [
//     new winston.transports.Console({
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       filename: 'logs/error.log'
//     })
//   ]
// }))
//
// app.use(function (err, req, res, next) {
//   console.error(err)
//   req.flash('error', err.message)
//   res.redirect('/posts')
// })



app.listen(config.port, function () {
	console.log(`${pkg.name} listening on port ${config.port}`)
})
