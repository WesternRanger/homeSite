var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    minifycss    = require('gulp-minify-css'),//css压缩
    uglify       = require('gulp-uglify'),// js压缩
    rev          = require('gulp-rev'),
    coffee       = require("gulp-coffee"), // 编译coffee
    gutil        = require("gulp-util"),// 一个工具库
    plumber      = require("gulp-plumber"), // 自动处理全部错误信息防止因为错误而导致 watch 不正常工作
    less         = require("gulp-less"),
    reactify     = require('reactify'),
    browserify   = require("browserify"),//用来 require js 的模块
    babelify     = require("babelify"),//转化es6或者jsx语法
    source       = require("vinyl-source-stream");//把 browserify 输出的数据进行准换，使之流符合 gulp 的标准

//less转化css，并压缩
gulp.task('less', function () {
    gulp.src('public/less/index.less')
        .pipe(less())
        .pipe(minifycss()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('public/stylesheets'));
});
//coffee 生成 js,并压缩
gulp.task("coffee",function(){
    gulp.src("public/coffee/index.coffee")
        .pipe(coffee())// 编译 coffee
        .pipe(uglify())//
        .pipe(gulp.dest("public/javascripts"));
})

gulp.task('reactjs', function(){
    browserify('./public/jsx/react.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('jsxParse.js'))
        .pipe(gulp.dest('public/javascripts'));
});


// 自动监听less、coffee转化为css、js
gulp.task('lessWatch', function () {
    gulp.watch('public/less/index.less', ['less']); //当所有less文件发生改变时，调用testLess任务
});

gulp.task('coffeeWatch', function () {
    gulp.watch('public/coffee/index.coffee', ['coffee']); //当所有less文件发生改变时，调用testLess任务
});

gulp.task('default', ['lessWatch','coffeeWatch']);