/**
 * Created by WesternRanger on 16/5/10.
 */
var express = require('express'),
    app     = express(),
    tool    = require('../common/tool');

app.post('/list', function(req, page) {
    var ctype = req.body.ctype;

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