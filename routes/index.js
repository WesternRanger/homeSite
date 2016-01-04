var express = require('express'),
    router = express.Router(),
    db = require('./conn'); //先引入数据库链接

router.get('/', function(req, resIndex) {
  //db.pool.getConnection(function(err, connection) {
  //  var sql = 'select * from test';
  //  connection.query(sql, function(error, res) {
  //      resIndex.render('index', {
  //          title: "从这里开始",
  //          res:res
  //      });
  //  });
  //  connection.release();
  //});
    resIndex.render('index', {
        title: "从这里开始",
    });

});

module.exports = router;
