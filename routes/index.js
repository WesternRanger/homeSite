/**
 * Created by WesternRanger on 16/4/27.
 */
'use strict'
var express = require('express'),
    router = express.Router(),
    tool = require('./common/tool');

// 首页
router.get('/',(req, res)=> {
    tool.renderPage(res,'index','从现在开始');
});

module.exports = router;