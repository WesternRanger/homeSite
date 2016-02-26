/**
 * Created by WesternRanger on 16/1/20.
 */
var express = require('express'),
    router = express.Router(),
    db = require('./conn'); //先引入数据库链接

router.get('/', function(req, resIndex) {
    var title   = req.param('title');
    var content = req.param('content');

    db.pool.getConnection(function(err, connection) {
        var sql = 'insert into blogs(title,content) values(?,?)',
        sql_val = [title,content];
        connection.query(sql ,sql_val ,function(error, res) {
            resIndex.render('publishBlog', {
                title: "从这里开始",
            });
        });
        connection.release();
    });
});

module.exports = router;
