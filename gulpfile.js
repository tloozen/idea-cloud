'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('scss', function() {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('watch', function() {
    gulp.watch('./assets/scss/*.scss', ['scss']);
});

gulp.task('default', ['scss']);