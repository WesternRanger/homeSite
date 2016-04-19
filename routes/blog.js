/**
 * Created by WesternRanger on 16/1/5.
 */
'use strict'
var express = require('express'),
    marked = require('marked'), // markdown转化
    router = express.Router(),
    tool = require('./common/tool');

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

router.get('/',(req, resIndex)=>{
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

module.exports = router;
