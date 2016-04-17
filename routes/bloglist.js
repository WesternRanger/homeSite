/**
 * Created by WesternRanger on 16/1/21.
 */
var express = require('express'),
    router = express.Router(),
    db = require('./conn'); //先引入数据库链接

function fatchData(sql,sql_val,req,result){
    db.pool.getConnection((err, connection)=> {
        connection.query(sql ,sql_val,(error, res)=> {
            result.render('bloglist', {
                title: "从这里开始",
                res:res
            });
        });
        connection.release();
    });
}
router.get('/',(req, resIndex)=> {
    var sql = 'select * from blogs';
    var sql_val = '';
    fatchData(sql,sql_val,req,resIndex);
});

module.exports = router;
