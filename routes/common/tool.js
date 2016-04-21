/**
 * Created by WesternRanger on 15/12/31.
 */
var mysql = require('mysql');

var obj = {
    pool:mysql.createPool({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'root',
        port: '3306',
        database: 'homesite'
    }),
    renderPage:function(res,url,title,par){
        res.cookie('western-ranger-cookie','cookie-WS',{
            maxAge: 20000,
            httpOnly:true,
            path:'/',
            secure:true
        });
        res.render(url,{
            title:title,
            res:par
        });
    }
}
module.exports = obj;
