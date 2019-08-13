const exp = require('express')
const db = require('../db')
const svgCaptcha = require('svg-captcha');
const router = exp.Router()
router
  .get('/captcha', function (req, res) {
    // var captcha = svgCaptcha.createMathExpr()// 使用数字之和当做验证码
    var captcha = svgCaptcha.create({
      color: true,
      background: '#ed52c9'
    });
    // req.session.captcha = captcha.text; // 把生成的验证码结果保存在session中
    res.cookie('captcha', captcha.text); // 把生成的验证码结果保存在cookie中
    // 输出验证码字符的结果：
    // console.log(captcha.text);
    res.type('svg');
    res.status(200).send(captcha.data); // 响应给浏览器一张验证码“图片”
  })

  .post('/userLogin', (req, res) => {
    if (req.body.vcode.toLocaleUpperCase() !== req.cookies.captcha.toLocaleUpperCase()) {   // cookie保存的验证码
      // if (req.body.vcode.toLocaleUpperCase() !== req.session.captcha.toLocaleUpperCase()) {  //  session保存的验证码
      return res.send({ code: 202, message: '验证码错误' })
    }
    let sql = `select * from user where username = ? and password = ?`
    db(sql, [req.body.username, req.body.password], (err, result) => {
      if (err) throw err
      if (result.length > 0) {
        res.cookie('isLogin', true);
        res.send({ code: 200, message: '登录成功' })
      } else {
        res.send({ code: 201, message: '账号密码错误' })
      }
    })
  })

  module.exports = router