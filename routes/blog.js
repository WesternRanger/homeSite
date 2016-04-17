/**
 * Created by WesternRanger on 16/1/5.
 */
var express = require('express'),
    marked = require('marked'), // markdown转化
    router = express.Router(),
    db = require('./conn'); //先引入数据库链接

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

router.get('/', function(req, resIndex) {
    var id = req.query.id;
    db.pool.getConnection(function(err, connection) {
        var sql = 'select * from blogs where id=?',
            sql_val = [id];
        connection.query(sql, sql_val ,function(error, res) {
            var _content = res[0].content;
            res[0].content = marked(_content);// markdown 转化为html
            resIndex.render('blog', {
                title: "从这里开始",
                res:res
            });
        });
        connection.release();
    });
});

module.exports = router;
