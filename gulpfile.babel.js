import    gulp         from 'gulp';
import    concat       from 'gulp-concat';//js压缩
import    minifycss    from 'gulp-minify-css';//css压缩
import    rev          from 'gulp-rev';
import    coffee       from "gulp-coffee"; // 编译coffee
import    gutil        from "gulp-util";// 一个工具库
import    plumber      from "gulp-plumber"; // 自动处理全部错误信息防止因为错误而导致 watch 不正常工作
import    less         from "gulp-less";
import    reactify     from 'reactify';
import    browserify   from "gulp-browserify";//用来 require js 的模块
import    sourcemaps   from "gulp-sourcemaps";
import    buffer       from "vinyl-buffer";
import    babelify     from "babelify";//转化es6或者jsx语法
import    source       from "vinyl-source-stream";//把 browserify 输出的数据进行准换，使之流符合 gulp 的标准
import    react        from 'gulp-react';
import    livereload   from 'gulp-livereload';//自动刷新
import    babel        from 'gulp-babel';//es6->es5
import    rename       from 'gulp-rename'; // 重命名文件
import    jshint       from 'gulp-jshint'; // js-hint

//less转化css，并压缩
gulp.task('lessParse', ()=> {
    gulp.src('./public/less/*.less')
        .pipe(less())
        .pipe(minifycss()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(livereload());
});
//coffee 生成 js,并压缩
gulp.task("coffeeParse",()=> {
    gulp.src("public/coffee/index.coffee")
        .pipe(coffee())// 编译 coffee
        .pipe(gulp.dest("public/javascripts"));
})
// jsx 生成 js,并压缩
gulp.task('jsxParse', ()=> {
    gulp.src('./public/jsx/*.*')
        .pipe(react()) // react 转化
        .pipe(gulp.dest('public/jsxParseFile')) // 转化为js后输出
        .pipe(livereload()); // 实时监控刷新浏览器
});
// es6 编译并压缩 js
gulp.task('es6Parse', function(){
    return gulp.src('./public/es6/*.*')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(babel())
        .pipe(browserify())// 支持require
        //.pipe(concat())
        .pipe(gulp.dest('public/javascripts'))
        .pipe(livereload());
});

// 自动监听less、coffee转化为css、js
gulp.task('lessWatch', ()=> {
    gulp.watch('public/less/*.less', ['lessParse']); //当所有less文件发生改变时，调用testLess任务
});

gulp.task('coffeeWatch', ()=> {
    gulp.watch('public/coffee/index.coffee', ['coffeeParse']); //当所有less文件发生改变时，调用testLess任务
});

gulp.task('jsxWatch', ()=> {
    gulp.watch('public/jsx/*.*', ['jsxParse']); //当所有jsx文件发生改变时，调用jsxParse任务git
});

gulp.task('es6Watch', ()=> {
    gulp.watch('public/es6/*.*', ['es6Parse']); //当所有jsx文件发生改变时，调用jsxParse任务
});



gulp.task('reload', ()=> {  // 检测修改，自动刷新
    livereload.listen()
    gulp.watch('./public/**/*.*',['lessParse','es6Parse']);
});

gulp.task('default', ['reload','lessWatch','es6Watch','jsxWatch']);