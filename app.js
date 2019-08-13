// 1、---------------加载所需模块
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url')
// 1.1 导入db.js
const db = require('./db.js');
// 1.2 设置cookie的模块
const cookieParser = require('cookie-parser');
// 1.3 设置session的模块
const session = require('express-session');
// 1.4 加载路由模块
const homeIndex = require('./router/index');
const userReg = require('./router/register');
const adminLogin = require('./router/login')


// 2、---------------创建服务器
const app = express();

// 3、---------------监听端口，开启服务
app.listen(3000, () => console.log('开启服务'));

// 4、--------------------------------------处理请求
// 4.1 处理静态资源的中间件
app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// 4.2 处理urlencoded 编码格式的请求体
app.use(bodyParser.urlencoded({ extended: false }));

// 4.3 cookie使用的中间件
app.use(cookieParser());

// 4.4 配置session
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}))

// 4.5  限制登录
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

// 4.6  处理静态页面资源==>等同4.6的接口
app.use(express.static('view'));

// 4.7  注册路由中间件
app.use(homeIndex);
app.use(userReg);
app.use(adminLogin);