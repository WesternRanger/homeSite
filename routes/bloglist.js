/**
 * Created by WesternRanger on 16/1/21.
 */
var express = require('express'),
    router = express.Router(),
    db = require('./conn'); //先引入数据库链接

router.get('/', function(req, resIndex) {
    db.pool.getConnection(function(err, connection) {

        var sql = 'select * from blogs';
        connection.query(sql ,function(error, res) {
            resIndex.render('bloglist', {
                title: "从这里开始",
                res:res
            });
        });
        connection.release();
    });
});

module.exports = router;
