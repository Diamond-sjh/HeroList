// 1、---------------加载所需模块
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url')
// 1.1 导入db.js
const db = require('./db.js');
// 1.2 添加英雄有文件,所以使用FormData上传,body-parser不能处理FormData的数据类型，所以使用multer模块
const multer = require('multer');
// 1.3 生成验证码模块
const svgCaptcha = require('svg-captcha');
// 1.4 设置cookie的模块
const cookieParser = require('cookie-parser');
// 1.5 设置session的模块
const session = require('express-session');


// 2、---------------创建服务器
const app = express();

// 3、---------------监听端口，开启服务
app.listen(3000, () => console.log('开启服务'));

// 4、---------------处理请求
// 4.1 处理静态资源的中间件
app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// 4.2 处理urlencoded 编码格式的请求体
app.use(bodyParser.urlencoded({ extended: false }));

// 4.3 cookie使用的中间件
app.use(cookieParser());

// 4.4  限制登录
app.use(checkLoginSession);
function checkLoginSession(req, res, next) {
  let params = url.parse(req.url, true)
  // console.log(params.pathname);
  if (params.pathname != '/login.html' && params.pathname != '/userLogin' && params.pathname != '/register.html' && params.pathname != '/captcha' && params.pathname != '/regNameOk' && params.pathname != '/regUser') {
    if (!req.cookies.isLogin) {
      return res.redirect('/login.html')
    }
  }
  next()
}


// 5、--------------------------------------------------各种接口
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html')
})
app.get('/add.html', (req, res) => {
  res.sendFile(__dirname + '/view/add.html')
})
app.get('/edit.html', (req, res) => {
  res.sendFile(__dirname + '/view/edit.html')
})
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/view/login.html')
})
app.get('/register.html', (req, res) => {
  res.sendFile(__dirname + '/view/register.html')
})
// 5.1  分页获取所有的英雄信息

// app.get('/getHeroes', (req, res) => {
//   let sql = 'select * from heroes order by id desc';
//   db(sql, null, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// })
// 5.1.1 新增模糊查询搜索功能
app.get('/getHeroes', (req, res) => {
  let page = req.query.page || 1;
  let pageNum = req.query.pageNum || 5;

  let keywords = req.query.keywords || null;
  let values = '';
  if (keywords) {
    values = `where name like '%${keywords}%' or nickname like '%${keywords}%'`
  }
  let sql = `select * from heroes ${values} order by id desc limit ${(page - 1) * pageNum} , ${pageNum};
  select count(*) c from heroes ${values}`
  db(sql, null, (err, result) => {
    if (err) throw err;
    // console.log(result);
    // return;
    res.send({
      code: 200,
      message: '请求数据成功',
      data: result[0],
      pageTotal: Math.ceil(result[1][0].c / pageNum)
    });
  });
})

// 5.2  新增英雄
const upload = multer({ dest: 'uploads/' });
app.post('/addHero', upload.single('heroIcon'), function (req, res) {
  let sql = 'insert into heroes set ?';
  let values = {
    name: req.body.heroName,
    nickname: req.body.heroNickName,
    skill: req.body.skillName,
    file: req.file.path
  }
  db(sql, values, (err, resule) => {
    if (err) {
      res.send({ code: 201, message: '添加失败' });
    } else {
      res.send({ code: 200, message: '添加成功' });
    }
  })
})

// 5.3  根据ID获取英雄信息
app.get('/getHeroById', (req, res) => {
  let id = req.query.id;
  // 如果id为空或者不是数字类型的时候，参数错误，给出提示
  if (!id || isNaN(id)) {
    res.send('参数错误');
    return;
  }
  let sql = 'select * from heroes where id=?'
  db(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result[0]);  //  result的值是一个数组
  })
})

// 5.4  修改英雄信息
app.post('/updateHero', upload.single('heroIcon'), function (req, res) {
  // console.log(req.body);
  // console.log(req.file);
  // return;
  let id = req.body.id;
  // 如果id为空或者不是数字类型的时候，参数错误，给出提示
  if (!id || isNaN(id)) {
    res.send('参数错误');
    return;
  }
  let sql = 'update heroes set ? where id = ?';
  let values = {
    name: req.body.heroName,
    nickname: req.body.heroNickName,
    skill: req.body.skillName,
  }
  // 如果图片没有改动req.file的值为undefined,所以需要单独判断
  if (req.file) {
    values.file = req.file.path
  }
  db(sql, [values, id], (err, result) => {
    if (err) {
      res.send({ code: 201, message: '修改失败' });
    } else {
      res.send({ code: 200, message: '修改成功' });
    }
  })
})

// 5.5  删除英雄信息
app.get('/deleteHero', (req, res) => {
  let id = req.query.id;
  // 如果id为空或者不是数字类型的时候，参数错误，给出提示
  if (!id || isNaN(id)) {
    res.send('参数错误');
    return;
  }
  let sql = 'delete from heroes where id = ?';
  db(sql, id, (err, result) => {
    if (err) {
      res.send({ code: 201, message: '删除失败' })
    } else {
      res.send({ code: 200, message: '删除成功' })
    }
  })
})

// 5.6  判断用户名是否被注册
app.post('/regNameOk', (req, res) => {
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

// 5.7  用户注册
app.post('/regUser', (req, res) => {
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

// 5.8  生成验证码端口
// 5.8.1  npm 安装 `npm i svg-captcha`可以去github.com网站去搜一下这个插件，然后将使用的代码复制到你的app.js中即可：
// 5.8.2 配置session
// app.use(session({
//   secret: 'keyboard cat',
//   cookie: { maxAge: 60000 },
//   resave: false,
//   saveUninitialized: false
// }))
// 5.8.3 生成验证码的接口
app.get('/captcha', function (req, res) {
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
});

// 5.9 登录接口
app.post('/userLogin', (req, res) => {
  if (req.body.vcode.toLocaleUpperCase() !== req.cookies.captcha.toLocaleUpperCase()) {   // cookie保存的验证码
    // if (req.body.vcode.toLocaleUpperCase() !== req.session.captcha.toLocaleUpperCase()) {  //  session保存的验证码
    res.send({ code: 202, message: '验证码错误' })
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