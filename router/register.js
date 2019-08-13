const exp = require('express')
const db = require('../db')
const router = exp.Router()
router
  .post('/regNameOk', (req, res) => {
    let sql = `select username from user where username = ?`
    // console.log(req.body);
    db(sql, req.body.username, (err, result) => {
      // console.log(result);
      // console.log(err);
      if (err) throw err;
      if (result != '') {
        res.send({ code: 201, message: '该用户名已经被占用' })
      }
    })
  })

  .post('/regUser', (req, res) => {
    // console.log(req.body);// [Object: null prototype] {username: 'zhangsan',password: '202cb962ac59075b964b07152d234b70' }
    let sql = `insert into user set ?`
    db(sql, req.body, (err, result) => {
      if (err) {
        res.send({ code: 201, message: '注册失败' });
      } else {
        res.send({ code: 200, message: '注册成功' });
      }
    })
  });

  module.exports = router