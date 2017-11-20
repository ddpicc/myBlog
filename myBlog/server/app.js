var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var passport = require('passport');
var session = require('express-session');
var passport = require('./passport');
const db = require('./db');
var api = require('./api');

var app = express();


app.set('port', (process.env.port || 3000))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// path.resolve()将相对路径->绝对路径
app.use('/dist', express.static(path.resolve(__dirname, '../dist')))
app.use(api)

// 这部分要写在404的前面，若匹配了，就不会执行下一个中间件了。参数中没有next则也不会执行下一个中间件
app.get('*', function(req, res) {
  console.log(db.isRegistered);
  if(db.isRegistered) {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    res.send(html);
  }
});

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})
