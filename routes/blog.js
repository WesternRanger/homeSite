/**
 * Created by WesternRanger on 16/1/5.
 */
var express = require('express'),
    router = express.Router(),
    db = require('./conn'); //先引入数据库链接

router.get('/', function(req, resIndex) {
    var id = req.query.id;
    db.pool.getConnection(function(err, connection) {
      var sql = 'select * from blogs where id=?',
          sql_val = [id];
      connection.query(sql, sql_val ,function(error, res) {
          //console.log(res[0].content);
          resIndex.render('blog', {
              title: "从这里开始",
              res:res
          });
      });
      connection.release();
    });
});

module.exports = router;
