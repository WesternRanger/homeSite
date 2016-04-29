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

// 博客页
router.get('/blog',(req, resIndex)=>{
    let id = req.query.id;
    tool.pool.getConnection((err, connection)=> {
        let sql = 'select * from blogs where id=?',
            sql_val = [id];
        connection.query(sql, sql_val ,(error, res)=> {
            let _content = res[0].content;
            res[0].content = marked(_content);// markdown 转化为html
            tool.renderPage(resIndex,'blog','从现在开始',res);
        });
        connection.release();
    });
});

//  博客列表
router.get('/bloglist',(req, resIndex)=> {
    var sql = 'select * from blogs';
    var sql_val = '';
    tool.pool.getConnection((err, connection)=> {
        connection.query(sql ,sql_val,(error, res)=> {
            tool.renderPage(resIndex,'bloglist','从这里开始',res);
        });
        connection.release();
    });
});

// 首页
router.get('/index',(req, res)=> {
    tool.renderPage(res,'index','从现在开始');
});

// publish 文章,markdown方式
router.get('/publishMD', function(req, res) {
    tool.renderPage(res,'publishBlog','从现在开始');
});

// publish 文章,富文本方式
router.get('/publishTXT', function(req, res) {
    tool.renderPage(res,'publishBlog1','从现在开始');
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
            tool.renderPage(resIndex,'fixBlog','从现在开始',res);
        });
        connection.release();
    });
});

module.exports = router;