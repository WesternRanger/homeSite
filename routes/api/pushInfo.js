/**
 * Created by WesternRanger on 16/5/10.
 */
var express = require('express'),
    app     = express(),
    tool    = require('../common/tool');

app.post('/list', function(req, page) {
    page.header('Access-Control-Allow-Origin', '*');
    page.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    page.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    tool.pool.getConnection(function(err, connection) {
        var sql = 'select * from pushInfo',
            sql_val = [];
        connection.query(sql, sql_val, function(error, rs) {
            // page.writeHead(200, {'Access-Control-Allow-origin': 'http://localhost:8888/'});
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
