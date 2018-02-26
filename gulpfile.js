'use strict';

var gulp = require('gulp');
var fs = require('file-system');
var requireDir = require('require-dir');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// Fetch all gulp tasks
requireDir('./gulp');

// Paths to watch
var WATCH_PATHS = {
  SCSS: ['scss/**/*.scss'],
  JAVASCRIPTS: ['js/vendor/*', 'js/partials/*', 'js/main.js'],
  DOCS: ['docs/**/*', 'README.md'],
  IMAGES: ['images/**/*']
};

var packageJson = JSON.parse(fs.readFileSync('package.json'));
var INDEX_FILE = packageJson.directories.browsersync.index_filepath;
var SERVER_ROOT = packageJson.directories.browsersync.server_root;


// Build tasks
// ---------------------------------------

// Build assets and documentation for production
gulp.task('build', function() {
  runSequence(
    ['styles', 'scripts', 'images', 'favicons'],
    ['docs']
  );
});

// Build assets and documentation for dev
gulp.task('build:dev', function() {
  runSequence(
    ['styles:dev', 'scripts:dev', 'images'],
    ['docs']
  );
});


// Dynamic tasks
// ---------------------------------------

// Start BrowserSync
gulp.task('server:start', function(){
  browserSync.init({
    server: {
      baseDir: SERVER_ROOT,
      index: INDEX_FILE
    }
  });
});

// Watch files for changes, reload browser on change
gulp.task('watch:start', function() {
  gulp.watch(WATCH_PATHS.SCSS, ['styles', browserSync.reload]);
  gulp.watch(WATCH_PATHS.JAVASCRIPTS, ['scripts', browserSync.reload]);
  gulp.watch(WATCH_PATHS.IMAGES, ['images', browserSync.reload]);
  gulp.watch(WATCH_PATHS.DOCS, ['docs', browserSync.reload]);
});

// Watch files for changes, reload browser on change
gulp.task('watch:dev:start', function() {
  gulp.watch(WATCH_PATHS.SCSS, ['styles:dev', browserSync.reload]);
  gulp.watch(WATCH_PATHS.JAVASCRIPTS, ['scripts:dev', browserSync.reload]);
  gulp.watch(WATCH_PATHS.IMAGES, ['images', browserSync.reload]);
  gulp.watch(WATCH_PATHS.DOCS, ['docs', browserSync.reload]);
});


// Default tasks
// ---------------------------------------

// Run production build, then start watch
gulp.task('watch', function() {
  runSequence(
    ['styles', 'scripts', 'images'],
    ['docs'],
    ['watch:start']
  );
});


// Run dev build, then start watch
gulp.task('watch:dev', function() {
  runSequence(
    ['styles:dev', 'scripts:dev', 'images'],
    ['docs'],
    ['watch:dev:start']
  );
});

// Run dev build, then start browsersync server and watch
gulp.task('serve', function() {
  runSequence(
    ['styles', 'scripts', 'images'],
    ['docs'],
    ['server:start', 'watch:start']
  );
});

// Run dev build, then start browsersync server and watch
gulp.task('serve:dev', function() {
  runSequence(
    ['styles:dev', 'scripts:dev', 'images', 'favicons'],
    ['docs'],
    ['server:start', 'watch:dev:start']
  );
});

// Run dev build, then start browsersync server and watch
gulp.task('default', ['build']);
