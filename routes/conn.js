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
        res.render(url,{
            title:title,
            res:par
        })
    }
}
module.exports = obj;
