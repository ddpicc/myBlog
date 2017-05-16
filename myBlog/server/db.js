const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String
})

const articleSchema = new Schema({
  title: String,
  content: String,
  date: Date,
  favor: Boolean
})

const linkSchema = new Schema({
  name: String,
  addr: String
})

const Model = {
  User: mongoose.model('User', userSchema),
  Articles: mongoose.model('Articles', articleSchema),
  Links: mongoose.model('Links', linkSchema),
  isRegistered: false
}

const initialize = function() {
  Model.User.find(null, function(err, users) {
    if(err) {
      console.log(err);
    } else if(users.length){
      console.log('已经存在用户啦')
      Model.isRegistered = true;
    } else {
      console.log('现在创建一个新用户')
      Model.User({username: 'chenshy', password: '123456'}).save();
      Model.isRegistered = true;
    }
  })
}

mongoose.connect('mongodb://127.0.0.1/myBlog')
const db = mongoose.connection

db.on('error', function() {
  console.log('数据库连接失败...');
})

db.on('open', function() {
  initialize();
  console.log('数据库连接成功...');
})

module.exports = Model
