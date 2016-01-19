/**
 * Created by WesternRanger on 16/1/5.
 */
var express = require('express'),
    router = express.Router(),
    db = require('./conn'); //先引入数据库链接

router.get('/', function(req, resIndex) {
    db.pool.getConnection(function(err, connection) {
      var sql = 'select * from blogs';
      connection.query(sql, function(error, res) {
          resIndex.render('blog', {
              title: "从这里开始",
              res:res
          });
      });
      connection.release();
    });
    //resIndex.render('blog', {
    //    title: "西泊浪人－博客",
    //});

});

module.exports = router;
