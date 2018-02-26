'use strict';

const gulp = require('gulp');
var favicons = require("gulp-favicons"),
gutil = require("gulp-util");
const fs = require('file-system');

var DEST = JSON.parse(fs.readFileSync('package.json')).directories.build.favicons;
var config = JSON.parse(fs.readFileSync('package.json')).faviconConfig;

gulp.task('favicons', () => {
  return gulp.src(config.faviconOrigin).pipe(favicons({
      appName: config.appName,
      appDescription: config.appDescription,
      developerName: config.developerName,
      developerURL: config.developerURL,
      background: config.background,
      theme_color: config.background,
      path: config.path,
      url: config.url,
      display: config.display,
      orientation: config.orientation,
      start_url: config.start_url,
      version: 1.0,
      logging: false,
      online: false,
      html: "favicons.html",
      pipeHTML: true,
      replace: true
  }))
  .on("error", gutil.log)
  .pipe(gulp.dest(DEST));
});