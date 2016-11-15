/**
 * Created by WesternRanger on 16/5/10.
 */
var express = require('express'),
    app     = express(),
    tool    = require('../common/tool');

app.post('/list', function(req, page, next) {
    //设置允许跨域访问
    page.header('Access-Control-Allow-Origin', '*');
    //page.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //page.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');


    tool.pool.getConnection(function(err, connection) {
        var sql = 'select * from pushInfo',
            sql_val = [];
        connection.query(sql, sql_val, function(error, rs) {
            if (req.method == 'OPTIONS') {
                page.json({
                    code:0,
                    res:rs,
                    msg:'success'
                })
            }else {
              next();
            }

        });
        connection.release();
    });
});


module.exports = app;
