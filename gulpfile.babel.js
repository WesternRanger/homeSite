import    gulp         from 'gulp';
import    concat       from 'gulp-concat';
import    minifycss    from 'gulp-minify-css';//css压缩
import    uglify       from 'gulp-uglify';// js压缩
import    rev          from 'gulp-rev';
import    coffee       from "gulp-coffee"; // 编译coffee
import    gutil        from "gulp-util";// 一个工具库
import    plumber      from "gulp-plumber"; // 自动处理全部错误信息防止因为错误而导致 watch 不正常工作
import    less         from "gulp-less";
import    reactify     from 'reactify';
import    browserify   from "browserify";//用来 require js 的模块
import    babelify     from "babelify";//转化es6或者jsx语法
import    source       from "vinyl-source-stream";//把 browserify 输出的数据进行准换，使之流符合 gulp 的标准
import    react        from 'gulp-react';
import    livereload   from 'gulp-livereload';//自动刷新


//less转化css，并压缩
gulp.task('less', ()=> {
    gulp.src('./public/less/*.less')
        .pipe(less())
        .pipe(minifycss()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(livereload());
});
//coffee 生成 js,并压缩
gulp.task("coffee",()=> {
    gulp.src("public/coffee/index.coffee")
        .pipe(coffee())// 编译 coffee
        .pipe(uglify())//
        .pipe(gulp.dest("public/javascripts"));
})
// jsx 生成 js,并压缩
gulp.task('jsxParse', ()=> {
    gulp.src('./public/jsx/*.*')
        .pipe(react())
        //.pipe(uglify())
        .pipe(gulp.dest('public/jsxParseFile'))
        .pipe(livereload());
});


// 自动监听less、coffee转化为css、js
gulp.task('lessWatch', ()=> {
    gulp.watch('public/less/*.less', ['less']); //当所有less文件发生改变时，调用testLess任务
});

gulp.task('coffeeWatch', ()=> {
    gulp.watch('public/coffee/index.coffee', ['coffee']); //当所有less文件发生改变时，调用testLess任务
});

gulp.task('jsxWatch', ()=> {
    gulp.watch('public/jsx/*.*', ['jsxParse']); //当所有jsx文件发生改变时，调用jsxParse任务
});

gulp.task('reload', ()=> {    // 检测修改，自动刷新
    livereload.listen()
    gulp.watch('./public/**/*.*',['less','jsxParse']);
});

gulp.task('default', ['reload','lessWatch','jsxWatch']);