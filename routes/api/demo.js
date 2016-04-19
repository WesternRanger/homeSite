/**
 * Created by WesternRanger on 16/4/19.
 */
var express = require('express'),
    app     = express(),
    tool    = require('../common/tool');

app.post('/profile',function (req, res, next) {
    //console.log(req.body);
    res.json({
        a:req.body.name,
        b:4
    });
});
app.post('/profile1',function(req,res,next){
    res.json({
        c:1
    });
})
app.post('/comment', function(req, res) {
    tool.pool.getConnection(function(err, connection) {
        var sql = 'select * from test';
        connection.query(sql, function(error, rs) {
            res.json({
                code:0,
                result:rs,
                msg:'success'
            })
        });
        connection.release();
    });
});
app.post('/commit', function(req, res) {
    var name = req.body.name;
    var talk = req.body.talk;

    tool.pool.getConnection(function(err, connection) {
        var sql = 'insert into test (author,text) values(?,?)',
            sql_val = [name,talk];
        connection.query(sql, sql_val, function(error, rs) {
            res.json({
                code:0,
                msg:'success'
            })
        });
        connection.release();
    });
});

module.exports = app;