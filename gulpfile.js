'use strict';

var gulp            =   require('gulp');
var browserSync     =   require('browser-sync');
var less            =   require('gulp-less');
var concat          =   require('gulp-concat');
var watch           =   require('gulp-watch');
var wiredep         =   require('wiredep').stream;

gulp.task('server', ['less', 'bower-dep'], function() {
    browserSync.init({
        server : {
            baseDir :"./app",
            routes:{
                "/bower_components" : "bower_components"
            }
        }
    });

    gulp.watch('./app/styles/less/*.less', ['less']);
    gulp.watch(['./app/js/**/*.js', './app/views/**/*.html', './app/styles/css/*.css', './app/index.html']).on('change', browserSync.reload);
});

gulp.task('less', function() {
    return gulp.src('./app/styles/less/*.less')
        .pipe(concat('main.css'))
        .pipe(less())
        .pipe(gulp.dest('./app/styles/css'));
});

gulp.task('bower-dep', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({}))
        .pipe(gulp.dest('./app'));
});
