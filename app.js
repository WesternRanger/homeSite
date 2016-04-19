//'use strict'
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fileMap = require('./fileMap'); // 路由入口文件

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
