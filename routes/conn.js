/**
 * Created by WesternRanger on 15/12/31.
 */
var mysql = require('mysql');
exports.pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port: '3306',
    database: 'homesite'
});