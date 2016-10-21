/**
 * Created by WesternRanger on 16/4/27.
 */
'use strict'
var express = require('express'),
    router = express.Router(),
    marked = require('marked'), // markdown转化
    async = require('async'),
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

let randomImg = [ // 推荐文章配图
    'http://7xp7rf.com1.z0.glb.clouddn.com/WEB.jpg',
    'http://7xp7rf.com1.z0.glb.clouddn.com/jianzhan.jpg',
    'http://7xp7rf.com1.z0.glb.clouddn.com/maid.jpg',
    'http://7xp7rf.com1.z0.glb.clouddn.com/js.jpg'
];

function queryBody(renderPage){
    let sql = 'select * from blogs order by id desc',
        sql_val = [];

    //数据库链接
    tool.pool.getConnection((err, connection)=> {

        connection.query(sql ,sql_val,(error, result)=> {

            let newArr = []; // 存储4个最新文章
            result.forEach((item,index)=>{
                item.content = marked(item.content);// markdown 转化为html
                item.content = item.content.replace(/<[^>]+>/g,"");
                item.content = item.content.substring(0,80);
                if(index<4){
                    switch(item.type){
                        case 'it':
                            item.cntype = '技术积累';
                            break;
                        case 'his':
                            item.cntype = '历史感悟';
                            break;
                        case 'lif':
                            item.cntype = '生活杂记';
                            break;
                        case 'log':
                            item.cntype = '更新记录';
                            break;
                        default:
                            break;
                    }
                    newArr.push(item);
                }
            });
            newArr.forEach((item,index)=>{
                item['imgurl'] = randomImg[index];// 配图
            });

            connection.query('select * from slide' ,[],(error, result)=> {
                let ress = [];
                result.forEach(function(item,index){
                    if(item.src){
                        ress.push(item);
                    }
                });
                var comboArr = [newArr,ress];
                tool.renderPage(renderPage,'index','',comboArr);
                
            });

        });

        connection.release();
        
    });
}
// 首页
router.get('/',(req, renderPage)=> {

    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){//移动端

        renderPage.redirect('https://www.baidu.com');

    }else{
        //pc
        queryBody(renderPage);
        
    }
});

module.exports = router;