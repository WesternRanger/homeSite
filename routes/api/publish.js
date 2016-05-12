/**
 * Created by WesternRanger on 16/4/19.
 */
var express = require('express'),
    app     = express(),
    tool    = require('../common/tool');

app.post('/blog', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var type = req.body.type;
    var date = new Date().toLocaleString();
    if(!title || !content||!type){
        res.json({
            code:10001,
            msg:'文章标题内容类型不为空',
            date:new Date().toLocaleString()
        })
    }else{
        tool.pool.getConnection(function(err, connection) {
            var sql = 'insert into blogs(title,content,type,date) values(?,?,?,?)',
                sql_val = [title,content,type,date];
            connection.query(sql, sql_val, function(error, rs) {
                res.json({
                    code:0,
                    msg:'success'
                })
            });
            connection.release();
        });
    }
});
app.post('/fixBlog', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var type = req.body.type;
    var id = req.body.id;
    if(!title || !content||!type){
        res.json({
            code:10001,
            msg:'文章标题内容标题不为空'
        })
    }else{
        tool.pool.getConnection(function(err, connection) {
            var sql = 'update blogs set title = ?, content = ?,type = ? where id = ?',
                sql_val = [title,content,type,id];
            connection.query(sql, sql_val, function(error, rs) {
                res.json({
                    code:0,
                    msg:'fix success'
                })
            });
            connection.release();
        });
    }
});

module.exports = app;