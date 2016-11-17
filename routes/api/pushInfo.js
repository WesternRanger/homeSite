/**
 * Created by WesternRanger on 16/5/10.
 */
var express = require('express'),
    app     = express(),
    tool    = require('../common/tool');

app.post('/list', function(req, page) {
    //设置允许跨域访问
    page.header('Access-Control-Allow-Origin', '*');

    tool.pool.getConnection(function(err, connection) {
        var sql = 'select * from pushInfo',
            sql_val = [];
        connection.query(sql, sql_val, function(error, rs) {
            page.json({
                code:0,
                res:rs,
                msg:'success'
            })
        });
        connection.release();
    });
});


module.exports = app;
