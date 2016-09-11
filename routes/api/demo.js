/**
 * Created by WesternRanger on 16/4/19.
 */
'use strict'
var express = require('express'),
    app     = express(),
    tool    = require('../common/tool');

app.post('/profile',function (req, res, next) {
    //console.log(req.body);
    res.json({
        name:req.body.name,
        login:req.body.login,
        value:4
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
//微信认证接口
//app.get('/weixin_confirm',(req,res)=>{
//    let TOKEN = 'westernrangernidaye',
//        signature = req.query.signature,
//        timestamp = req.query.timestamp,//微信传来时间戳
//        nonce = req.query.nonce,//微信随机数
//        echostr = req.query.echostr;//微信随机字符串,校验signature成功之后需要返回
//
//    let key = [TOKEN, timestamp, nonce].sort().join("");
//    let sha1 = require("crypto").createHash("sha1");
//    sha1.update(key);
//
//    if(sha1.digest("hex") == signature){
//        console.log('微信调用成功!'+echostr);
//        res.end(echostr);
//    }
//});

//制作签名
function checkSignature(TOKEN,timestamp,nonce){
    let key = [TOKEN, timestamp, nonce].sort().join("");
    let sha1 = require("crypto").createHash("sha1");
    sha1.update(key);
    return sha1.digest("hex");
}

//制作xml返回消息
function msgXML(data){
    var msg = '你最帅';
    switch(data.content){
        case 'hi':
            msg = 'hi,帅哥';
            break;
        case '还是你帅':
            msg = '不不,你帅';
            break;
        case '不不你帅':
            msg = '哈哈哈哈,那我就不客气了,我帅我帅';
            break;
        case '...':
            msg = '=_=';
            break;
        default:
            msg = '欢迎关注西泊浪人的装逼平台西泊园~从此不错过那些精彩瞬间~~';
            break;
    };
    var resMsg = '<xml>' +
        '<ToUserName><![CDATA[' + data.fromusername + ']]></ToUserName>' +
        '<FromUserName><![CDATA[' + data.tousername + ']]></FromUserName>' +
        '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
        '<MsgType><![CDATA[text]]></MsgType>' +
        '<Content><![CDATA['+msg+']]></Content>' +
        '</xml>';
    return resMsg;
}
//微信认证接口
app.post('/weixin_confirm',(req,res)=>{
    res.writeHead(200, {'Content-Type': 'application/xml'});

    let TOKEN = 'westernrangernidaye',
        signature = req.query.signature,
        timestamp = req.query.timestamp,//微信传来时间戳
        nonce = req.query.nonce;//微信随机数
    var data = req.body.xml;

    //获取签名
    var sig = checkSignature(TOKEN, timestamp, nonce);
    //获取格式化的返回值
    var resMsg = msgXML(data);

    if(sig == signature){
        console.log('微信调用成功!'+JSON.stringify(data));
        res.end(resMsg);
    }
});

module.exports = app;
