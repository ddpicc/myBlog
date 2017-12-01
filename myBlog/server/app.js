var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon');
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var fs = require('fs')
// var passport = require('passport');
// var session = require('express-session');
// var passport = require('./passport');
const db = require('./db')
var api = require('./api')
var Session = require('./session')

var app = express()

app.set('port', (process.env.port || 3000))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// path.resolve()将相对路径->绝对路径
app.use('/dist', express.static(path.resolve(__dirname, '../dist')))
app.use(api)

// 这部分要写在404的前面，若匹配了，就不会执行下一个中间件了。参数中没有next则也不会执行下一个中间件
app.get('*', function (req, res) {
  if (db.isRegistered) {
    // {key: value}
    var id = req.cookies[Session.key]
    console.log('req.cookies:' + id)
    if (!id) {
      req.session = Session.generate()
    } else {
      Session.getSessionById(id).then((session) => {
        session = JSON.parse(session)
        if (session) {
          if (session.expire > (new Date()).getTime()) {
            console.log('update')
            // session尚未过期，更新session过期时间
            Session.updateExpire()
            req.session = session
          } else {
            console.log('out date')
            // session过期
            Session.deleteSessionById(id)
            req.session = Session.generate()
          }
        } else {
          // id没有对应的session
          req.session = Session.generate()
        }
      }, (err) => {
        console.log(err)
      })
    }
    setTimeout(() => {
      var writeHead = res.writeHead
      res.writeHead = function () {
        var cookies = res.getHeader('Set-Cookie')
        var session = Session.serialize('session_id', req.session.id, {httpOnly: 1})
        cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session]
        cookies = cookies.filter((val) => {
          return val !== undefined
        })
        res.setHeader('Set-Cookie', cookies)
        return writeHead.apply(this, arguments)
      }
      // 获取基础页面
      const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
      res.send(html)
    }, 1000)
  }
})

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})
