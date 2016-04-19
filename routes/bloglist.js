/**
 * Created by WesternRanger on 16/1/21.
 */
var express = require('express'),
    router = express.Router(),
    tool = require('./common/tool'); //先引入数据库链接

router.get('/',(req, resIndex)=> {
    var sql = 'select * from blogs';
    var sql_val = '';
    tool.pool.getConnection((err, connection)=> {
        connection.query(sql ,sql_val,(error, res)=> {
            tool.renderPage(resIndex,'bloglist','从这里开始',res);
        });
        connection.release();
    });
});

module.exports = router;
