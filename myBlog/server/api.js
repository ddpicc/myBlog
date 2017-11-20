const express = require('express')
const router = express.Router()
const db = require('./db')

// 用户登录
router.post('/api/login', function (req, res) {
  const username = req.body.username
  const password = req.body.password
  db.User.find({username}, 'password', function (err, users) {
    if (!users.length) {
      res.send({status: 0, msg: '该用户不存在'})
    } else if (users[0].password !== password) {
      res.send({status: 1, msg: '密码错误'})
    } else if (users[0].password === password) {
      res.send({status: 2, msg: '成功登录'})
    }
  })
})

// 获取所有的文章
router.get('/api/getArticles', function (req, res) {
  db.Articles.find(null, 'title content date favor', function (err, articles) {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(articles))
    }
  })
})

// 获取所有的链接
router.get('/api/getLinks', function (req, res) {
  db.Links.find(null, 'name addr', function (err, links) {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(links))
    }
  })
})

// 保存所有链接
router.post('/api/saveLinks', function (req, res) {
  const links = req.body
  db.Links.remove(null, () => {})
  links.map(({name, addr}) => {
    new db.Links({name, addr}).save()
  })
  res.send({status: 2, msg: '保存成功'})
})

// 保存文章
router.post('/api/saveArticle', function (req, res) {
  const id = req.body.id
  const title = req.body.title
  const content = req.body.content
  const favor = false
  const date = new Date()
  if (id) {
    db.Articles.findByIdAndUpdate(id, {id, title, date, content, favor}, () => {})
  } else {
    new db.Articles({title, date, content, favor}).save()
  }
  res.send({status: 2, msg: '保存成功'})
})

// 获取特定的文章
router.get('/api/getArticle', function (req, res) {
  const _id = req.query.id
  db.Articles.findById({_id}, (err, article) => {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(article))
    }
  })
})

// 删除特定文章
router.post('/api/deleteArticle', function (req, res) {
  const id = req.body.id
  db.Articles.findByIdAndRemove({_id: id}, (err) => {
    if (err) {
      res.send({status: 1, msg: '删除失败'})
    } else {
      res.send({status: 2, msg: '删除成功'})
    }
  })
})

// 修改收藏
router.post('/api/changeFavor', function (req, res) {
  const _id = req.body.id
  const favor = !req.body.favor
  db.Articles.findByIdAndUpdate({_id}, {favor}, (err) => {
    if (err) {
      res.send({status: 1, msg: '修改失败'})
    } else {
      res.send({status: 2, msg: '添加到收藏！'})
    }
  })
})
module.exports = router
