/**
 * Created by WesternRanger on 16/1/2.
 */
var express = require('express');
var router = express.Router();
var db = require('./conn');

router.post('/', function(req, res) {
    db.pool.getConnection(function(err, connection) {
        var sql = 'select * from test';
        connection.query(sql, function(error, rs) {
            res.send({
                code:0,
                result:rs,
                msg:'success'
                //data:req.body
            })
        });
        connection.release();
    });
});

module.exports = router;