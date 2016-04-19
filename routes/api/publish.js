/**
 * Created by WesternRanger on 16/4/19.
 */
var express = require('express'),
    app     = express(),
    tool    = require('../common/tool');

app.post('/blog', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;

    tool.pool.getConnection(function(err, connection) {
        var sql = 'insert into blogs(title,content) values(?,?)',
            sql_val = [title,content];
        connection.query(sql, sql_val, function(error, rs) {
            res.json({
                title:req.body.title,
                code:0,
                msg:'success'
            })
        });
        connection.release();
    });
});

module.exports = app;