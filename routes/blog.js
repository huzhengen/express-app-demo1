var express = require('express');
var router = express.Router();
const db = require('../db/index')

/* GET users listing. */
router.get('/', function (req, res, next) {
  const blog = req.body
  const sqlStr = 'select * from blog'
  const data = db.query(sqlStr, (err, result) => {
    // 执行mysql语句失败
    if (err) {
      return res.send({ status: 1, message: err.message })
    }
    // 判断用户名是否被占用
    if (result.length > 0) {
      return res.send({ status: 1, message: '被占用，请更换' })
    }
  })
  res.send({ status: 0, message: '查找成功' })
});

router.post('/', function (req, res, next) {
  console.log(req.body)
  console.log(req.body.a);
  const blog = req.body
  const sqlInsert = 'insert into blog set ?'
  db.query(sqlInsert, {
    title: blog.title,
    description: blog.description,
    content: blog.content,
    atIndex: blog.atIndex,
  }, (err, result) => {
    if (err) {
      return res.send({ status: 1, message: err.message })
    }
    if (result.affectedRows !== 1) {
      return res.send({ status: 1, message: '添加博客失败，请稍后重试' })
    }
    res.send({ status: 0, message: '添加博客成功' })
  })
});


module.exports = router;
