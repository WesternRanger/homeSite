var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    minifycss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    rev          = require('gulp-rev'),
    gulp         = require("gulp"),
    coffee       = require("gulp-coffee"), // 编译coffee
    gutil        = require("gulp-util"),// 一个工具库
    plumber      = require("gulp-plumber"), // 自动处理全部错误信息防止因为错误而导致 watch 不正常工作
    less         = require("gulp-less"),
    sass         = require('gulp-ruby-sass');


// 合并css
gulp.task('css', function() {                              
    gulp.src(['./public/stylesheets/index1.css', './public/stylesheets/index2.css'])
        .pipe(concat('style.min.css'))
        .pipe(minifycss()) 
        .pipe(gulp.dest('./public/style_min'))
        .pipe(rev())                                   
        .pipe(gulp.dest('./public/style_rev'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css'))                             
});

//生成less
gulp.task('Less', function () {
    gulp.src('public/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/stylesheets'));
});

//生成sass
gulp.task('sass', function () {
    return sass('public/scss/*.scss')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('public/stylesheets'));
});


//生成 js
gulp.task("coffee",function(){
    gulp.src("public/coffee/*.coffee")
        .pipe(coffee())// 编译 coffee
        .pipe(gulp.dest("public/javascripts"
        ))
})

gulp.task('default', ['css','Less','sass','coffee']);