// 1、---------------加载所需模块
const express = require('express');
const bodyParser = require('body-parser');
// 1.1 导入db.js
const db = require('./db.js');

// 2、---------------创建服务器
const app = express();

// 3、---------------监听端口，开启服务
app.listen(3000, () => console.log('开启服务'));

// 4、---------------处理请求
// 4.1 处理静态资源的中间件
app.use(express.static('manager'));

// 4.2 处理urlencoded 编码格式的请求体
app.use(bodyParser.urlencoded({ extended: false }));


// 5、--------------------------------------------------各种接口