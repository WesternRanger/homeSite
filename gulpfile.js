var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    minifycss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    rev          = require('gulp-rev'),
    revcollector = require('gulp-rev-collector'),
    coffee       = require('gulp-coffee'),
    coffeelint   = require('gulp-coffeelint');

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

gulp.task('default', ['css']);