// 1、---------------加载所需模块
const express = require('express');
const bodyParser = require('body-parser');
// 1.1 导入db.js
const db = require('./db.js');
// 1.2 添加英雄有文件,所以使用FormData上传,body-parser不能处理FormData的数据类型，所以使用multer模块
const multer = require('multer');

// 2、---------------创建服务器
const app = express();

// 3、---------------监听端口，开启服务
app.listen(3000, () => console.log('开启服务'));

// 4、---------------处理请求
// 4.1 处理静态资源的中间件
app.use(express.static('manager'));
app.use('/uploads',express.static(__dirname + '/uploads'));

// 4.2 处理urlencoded 编码格式的请求体
app.use(bodyParser.urlencoded({ extended: false }));


// 5、--------------------------------------------------各种接口
// 5.1  获取所有的英雄信息
app.get('/getHeroes', (req, res) => {
  let sql = 'select * from heroes order by id desc';
  db(sql, null, (err, result) => {
    if (err) throw err;
    res.send(result);
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
  db(sql,values,(err,resule) => {
    if(err){
      res.send({code: 201, message: '添加失败'});
    }else{
      res.send({code: 200, message: '添加成功'});
    }
  })
})