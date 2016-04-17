/**
 * Created by WesternRanger on 16/1/5.
 */
'use strict'
let express = require('express'),
    marked = require('marked'), // markdown转化
    router = express.Router(),
    db = require('./conn'); //先引入数据库链接

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

function renderPage(res,par){
    res.render('blog',{
        title:'从现在开始',
        res:par
    })
}

function fetchData(req, resIndex){
    let id = req.query.id;
    db.pool.getConnection((err, connection)=> {
        let sql = 'select * from blogs where id=?',
            sql_val = [id];
        connection.query(sql, sql_val ,(error, res)=> {
            let _content = res[0].content;
            res[0].content = marked(_content);// markdown 转化为html
            renderPage(resIndex,res);
        });
        connection.release();
    });
}

router.get('/',fetchData);

module.exports = router;
