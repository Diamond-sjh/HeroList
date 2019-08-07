// 创建db.js。将查询的代码封装成函数，并导出：
module.exports = (sql, values, cb) => {
  // 1、加载mysql模块
  const mysql = require('mysql');

  // 2、创建连接对象
  const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'heroes',
    multipleStatements: true
  })

  // 3、连接到mysql
  conn.connect();

  // 4、查询(增删改查)
  conn.query(sql, values, cb);

  // 5、断开连接
  conn.end();
}
