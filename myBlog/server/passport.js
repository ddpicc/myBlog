var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var account = require('./account.json');
var fs = require('fs');
var path = require('path');

passport.use('local', new Strategy({
        username: 'username',
        password: 'password'
    },
    function(username, password, cb) {
        if(username != account.username) {
            return cb(null, false, {message: '用户名错误'});
        }
        if(password != account.password) {
            return cb(null, false, {message: '密码错误'});
        }
        return cb(null, account);
    }
));

passport.serializeUser(function(account, cb) {
    console.log('in serializeUser');
    return cb(null, account.id);
});

passport.deserializeUser(function(id, cb) {
    console.log('in deserializeUser');
    if(id == account.id) {
        return cb(null, account);
    } else {
        return cb(err);
    }
});

passport.authenticateMiddleware = function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
      res.send(html);
    }
  }
};

module.exports = passport;
