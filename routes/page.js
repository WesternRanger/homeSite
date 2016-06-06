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
});

//  博客列表
router.get('/bloglist',(req, resIndex)=> {
    let type = req.query.type,
        sql = 'select * from blogs where type = ?',
        sql_val = [type];
    tool.pool.getConnection((err, connection)=> {
        connection.query(sql ,sql_val,(error, res)=> {
            tool.renderPage(resIndex,'bloglist','',res);
        });
        connection.release();
    });
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

// 发帖
router.get('/recruit',(req, resIndex)=>{
    //let id = req.query.id;
    //tool.pool.getConnection((err, connection)=> {
    //    let sql = 'select * from blogs where id=?',
    //        sql_val = [id];
    //    connection.query(sql, sql_val ,(error, res)=> {
    //        let _content = res[0].content;
    //        res[0].content = marked(_content);// markdown 转化为html
    //        tool.renderPage(resIndex,'blog',res[0].title,res);
    //    });
    //    connection.release();
    //});
    tool.renderPage(resIndex,'recruit','西泊园论坛');
});

module.exports = router;