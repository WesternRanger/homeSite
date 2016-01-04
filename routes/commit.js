/**
 * Created by WesternRanger on 16/1/4.
 */
var express = require('express');
var router = express.Router();
var db = require('./conn');

router.post('/', function(req, res) {
    var name = req.query.name;
    var talk = req.query.talk;

    db.pool.getConnection(function(err, connection) {
        var sql = 'insert into test (author,text) values(?,?)',
            sql_val = [name,talk];
        connection.query(sql, sql_val, function(error, rs) {
            res.send({
                code:0,
                msg:'success'
            })
        });
        connection.release();
    });
});

module.exports = router;