'use strict';

var gulp = require('gulp');
var fs = require('file-system');
var $ = require('gulp-load-plugins')();

var PATHS = ['images/**/*'];

var DEST = JSON.parse(fs.readFileSync('package.json')).directories.build.images;

// Optimize and copy all images
gulp.task('images', function() {
  return gulp.src(PATHS)
    .pipe($.imagemin())
    .pipe(gulp.dest(DEST));
});
