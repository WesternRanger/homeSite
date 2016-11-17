/**
 * Created by WesternRanger on 16/11/17.
 */
var express = require('express'),
    app     = express(),
    tool    = require('../common/tool');

app.post('/checkadmin', (req, page)=> {
    var user = req.body.username;
        pass = req.body.password;

    if(!user || !pass){
        page.json({
            code:404,
            res:'',
            msg:"用户名密码不为空"
        })
    }else{
        tool.pool.getConnection((err, connection) => {
            var sql = 'select userid from admin where username = ? and password = ?',
                sql_val = [user,pass];
            connection.query(sql, sql_val, (error, rs)=> {
                if(rs.length){
                    page.json({
                        code:666,
                        res:rs[0],//返回uid
                        redirectUrl:'/page/publishMD',
                        msg:'success'
                    })
                }else{
                    page.json({
                        code:555,
                        res:'',
                        msg:'输入用户名密码有误'
                    })
                }
            });
            connection.release();
        });
    }
});


module.exports = app;
