//'use strict'
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fileMap = require('./fileMap'); // 路由入口文件

//var routes = require('./routes/index'); // 首页
//var blog = require('./routes/blog'); // 博客详情
//var bloglist = require('./routes/bloglist'); // 博客列表
//var publishBlog = require('./routes/publishBlog');// markdown后台添加博客
//var publishBlog1 = require('./routes/publishBlog1');// redactor后台添加博客
//var users = require('./routes/users');//

/* ajax接口 */
//var comment = require('./routes/api/publish');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// render页面
for(var p in fileMap){
    app.use('/'+p,fileMap[p]);
}
//app.use('/', routes);
//app.use('/blog', blog);
//app.use('/bloglist',bloglist);
//app.use('/publishBlog',publishBlog);
//app.use('/publishBlog1',publishBlog1);
//app.use('/users', users);

/* ajax接口 */
//app.use('/api/publish/blog',comment);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers\
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next)=> {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next)=> {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8888,()=>{
  console.log("Server has Started at port 8888");
});

module.exports = app;
