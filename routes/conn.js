/**
 * Created by WesternRanger on 15/12/31.
 */
var mysql = require('mysql');
exports.pool = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    port: '3306',
    database: 'homesite'
});