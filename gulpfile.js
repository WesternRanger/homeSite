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
    source       = require("vinyl-source-stream"),//把 browserify 输出的数据进行准换，使之流符合 gulp 的标准
    react        = require('gulp-react'),
    livereload   = require('gulp-livereload');//自动刷新

//less转化css，并压缩
gulp.task('less', function () {
    gulp.src('public/less/index.less')
        .pipe(less())
        .pipe(minifycss()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(livereload());
});
//coffee 生成 js,并压缩
gulp.task("coffee",function(){
    gulp.src("public/coffee/index.coffee")
        .pipe(coffee())// 编译 coffee
        .pipe(uglify())//
        .pipe(gulp.dest("public/javascripts"));
})
// jsx 生成 js,并压缩
gulp.task('jsxParse', function () {
    gulp.src('./public/jsx/*.*')
        .pipe(react())
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'))
        .pipe(livereload());
});


// 自动监听less、coffee转化为css、js
gulp.task('lessWatch', function () {
    gulp.watch('public/less/index.less', ['less']); //当所有less文件发生改变时，调用testLess任务
});

gulp.task('coffeeWatch', function () {
    gulp.watch('public/coffee/index.coffee', ['coffee']); //当所有less文件发生改变时，调用testLess任务
});

gulp.task('jsxWatch', function () {
    gulp.watch('public/jsx/indexReact.jsx', ['jsxParse']); //当所有jsx文件发生改变时，调用jsxParse任务
});

gulp.task('reload', function () {    // 检测修改，自动刷新
    livereload.listen()
    gulp.watch('./public/**/*.*',['less','jsxParse']);
});

gulp.task('default', ['reload','lessWatch','jsxWatch']);