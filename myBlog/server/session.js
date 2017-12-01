const db = require('./db')

var expires = 20 * 60 * 1000
var key = 'session_id'

var generate = function () {
  var id = (new Date()).getTime() + Math.random()
  var expire = (new Date()).getTime() + expires
  new db.Sessions({id, expire}).save()
  return {
    id,
    expire
  }
}

// 通过自定义id删除session
var deleteSessionById = function (id) {
  db.Sessions.remove({id}, (err) => {
    if (err) {
      console.log('删除失败')
    } else {
      return true
    }
  })
}

// 更新过期时间
// TODO: 无法正常更新
var updateExpire = function (id) {
  var expire = (new Date()).getTime() + expires
  db.Sessions.update({id}, {id, expire}, () => {})
}

// 通过session_id获取session信息
var getSessionById = function (id) {
  return new Promise((resolve, reject) => {
    db.Sessions.find({id}, 'id expire', (err, sessions) => {
      console.log('db session:' + JSON.stringify(sessions))
      if (err) {
        reject(null)
      } else {
        resolve(JSON.stringify(sessions[0]))
      }
    })
  })
}

var serialize = function (name, val, opt) {
  var pairs = [name + '=' + val]
  opt = opt || {}
  if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge)
  if (opt.domain) pairs.push('Domain=' + opt.domain)
  if (opt.path) pairs.push('Path=' + opt.path)
  if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString())
  if (opt.httpOnly) pairs.push('HttpOnly')
  if (opt.secure) pairs.push('Secure')

  return pairs.join('; ')
}

module.exports = {
  key,
  expires,
  generate,
  getSessionById,
  deleteSessionById,
  updateExpire,
  serialize
}
