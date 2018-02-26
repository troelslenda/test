'use strict';

var gulp = require('gulp');
var sourceFiles = 'docs/*.html';
var sourceData = 'docs/data/*.json';
var destination = 'build/';
var destinationData = 'build/data';

gulp.task('docs:data', function() {
  return gulp.src(sourceData)
    .pipe(gulp.dest(destinationData ));    
});

gulp.task('docs:copy', function () {
  return gulp.src(sourceFiles)
    .pipe(gulp.dest(destination));
}); 

gulp.task('docs', ['docs:copy', 'docs:data']);
