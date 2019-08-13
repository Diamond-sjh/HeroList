const exp = require('express');
const multer = require('multer');
const db = require('../db')
const router = exp.Router();
const upload = multer({ dest: 'uploads/' });


router
  .get('/getHeroes', (req, res) => {
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

  .post('/addHero', upload.single('heroIcon'), function (req, res) {
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

  .get('/getHeroById', (req, res) => {
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

  .post('/updateHero', upload.single('heroIcon'), function (req, res) {
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

  .get('/deleteHero', (req, res) => {
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

module.exports = router