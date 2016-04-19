/**
 * Created by WesternRanger on 16/1/20.
 */
var express = require('express'),
    router = express.Router(),
    tool = require('./common/tool'); //先引入数据库链接

router.get('/', function(req, resIndex) {
    resIndex.render('publishBlog1', {
        title: "从这里开始",
    });
});

module.exports = router;
