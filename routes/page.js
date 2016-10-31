/**
 * Created by WesternRanger on 16/4/20.
 */
'use strict'
var express = require('express'),
    marked = require('marked'), // markdown转化
    router = express.Router(),
    tool = require('./common/tool');

 //配置marked,(marked转化)
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

let randomImg = [ // 推荐文章配图 首页
    'http://7xp7rf.com1.z0.glb.clouddn.com/WEB.jpg',
    'http://7xp7rf.com1.z0.glb.clouddn.com/jianzhan.jpg',
    'http://7xp7rf.com1.z0.glb.clouddn.com/maid.jpg',
    'http://7xp7rf.com1.z0.glb.clouddn.com/js.jpg'
];

// 博客页
router.get('/blog',(req, resIndex)=>{

    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){//移动端

        resIndex.redirect('https://www.baidu.com');

    }else{
        //pc
        let id = req.query.id;
        tool.pool.getConnection((err, connection)=> {
            let sql = 'select * from blogs where id=?',
                sql_val = [id];
            connection.query(sql, sql_val ,(error, res)=> {
                let _content = res[0].content;
                res[0].content = marked(_content);// markdown 转化为html
                tool.renderPage(resIndex,'blog',res[0].title,res);
            });
            connection.release();
        });
    }

});

//  博客列表
router.get('/bloglist',(req, resIndex)=> {

    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){//移动端

        resIndex.redirect('https://www.baidu.com');

    }else{
        let type = req.query.type,
            sql = 'select * from blogs where type = ?',
            sql_val = [type];
        tool.pool.getConnection((err, connection)=> {
            connection.query(sql ,sql_val,(error, res)=> {
                tool.renderPage(resIndex,'bloglist','',res);
            });
            connection.release();
        });
    }

});

// publish 文章,markdown方式
router.get('/publishMD', function(req, res) {
    tool.renderPage(res,'publishBlog','');
});

// 修改文章,markdown方式
router.get('/fixBlog', function(req, resIndex) {
    let id = req.query.id;
    tool.pool.getConnection((err, connection)=> {
        let sql = 'select * from blogs where id=?',
            sql_val = [id];
        connection.query(sql, sql_val ,(error, res)=> {
            let _content = res[0].content;
            res[0].content_markdown = marked(_content);// markdown 转化为html
            tool.renderPage(resIndex,'fixBlog','',res);
        });
        connection.release();
    });
});

// vue demo
router.get('/vue1tapdemo',(req, resIndex)=>{
    tool.renderPage(resIndex,'vue1tapdemo','西泊园论坛');
});

// vue 2.0 demo
router.get('/vue2demo',(req, resIndex)=>{
    tool.renderPage(resIndex,'vue2demo','vue 2.0 demo');
});

// react demo
router.get('/react1',(req, resIndex)=>{
    tool.renderPage(resIndex,'react1','reactDemo1');
});

// ajax demo
router.get('/ajax',(req, resIndex)=>{
    tool.renderPage(resIndex,'ajax','zepto ajax');
});

// weixin sdk demo
router.get('/wx',(req, resIndex)=>{
    tool.renderPage(resIndex,'wx','微信sdk调用');
});

// vueloader demo
router.get('/vueloader',(req, resIndex)=>{
    tool.renderPage(resIndex,'vueloader','vueloader demo');
});

// 模拟抢票
router.get('/qiang',(req, resIndex)=>{
    tool.renderPage(resIndex,'qiang','模拟抢票');
});

// vuex 存在意义，解决全局变量
router.get('/vuex',(req, resIndex)=>{
    tool.renderPage(resIndex,'vuex','vuex demo');
});

// spa 页面滚动调研
router.get('/spa',(req, resIndex)=>{
    tool.renderPage(resIndex,'spa','spa scroll demo');
});

module.exports = router;
