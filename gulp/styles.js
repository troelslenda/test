'use strict';

// General utilities
const gulp = require('gulp');
const gulpif = require('gulp-if');
const fs = require('file-system');
const chalk = require('chalk');
const plumber = require('gulp-plumber');
const argv = require('yargs').boolean(['development']).argv;
const {log, colors} = require('gulp-util');
// Parsers
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const scsslint = require('gulp-scss-lint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const {gulpSassError} = require('gulp-sass-error');

// Setting production environment as default
process.env.NODE_ENV = !argv.development ? 'production' : 'development';

var PATHS = [
  'scss/**/*.scss',
  '!scss/umbraco/*'
];

var LINT_PATHS = [
  'scss/**/*.scss',
  '!scss/_bootstrap-variables.scss',
  '!scss/docs.scss',
  '!scss/vendor/**/*.scss',
  '!scss/umbraco/**/*.scss'
];

var packageJson = JSON.parse(fs.readFileSync('package.json'));
var DEST = packageJson.directories.build.stylesheets;

var PREFIXER_OPTIONS = {
  // https://github.com/postcss/autoprefixer#options
  browsers: [
    'last 2 versions',
    'ie >= 9',
    'Android >= 2.3'
  ],
  cascade: false
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

//
// Set environment
//

gulp.task('set-env-dev', () => {
  process.env.NODE_ENV = 'development';
});

//
// Sass build task
//

gulp.task('sass', () => {
  return gulp.src(PATHS)
    // Activate plumber in dev mode to avoid tasks ending on error
    .pipe(gulpif(!isProduction(), plumber()))
    // Initiate source maps in development mode
    .pipe(gulpif(!isProduction(), sourcemaps.init()))
    // Compile SASS for production
    .pipe(gulpif(isProduction(),
      sass({outputStyle: 'compressed'})
      // Instead of sass.logError you use gulpSassError
      // Throw error and fail build in production mode
      .on('error', gulpSassError(isProduction()))))
    // Compile SASS for development
    .pipe(gulpif(!isProduction(),
      sass()
      .on('error', sass.logError)))
    .pipe(postcss([postcssFlexbugsFixes, autoprefixer(PREFIXER_OPTIONS)]))
    // Write source maps in development mode
    .pipe(gulpif(!isProduction(), sourcemaps.write()))
    .pipe(gulp.dest(DEST));
});

gulp.task('scsslint', () => {
  return gulp.src(LINT_PATHS)
    // Run SCSS Lint
    .pipe(scsslint())
    // Fail build on warnings in production environment
    .pipe(gulpif(isProduction(), scsslint.failReporter()))
    // Show proper error messages for scsslint instead of 'Fatal undefined'
    .on('error', err => {
      log(colors.bgRed.white(err.message));
      // Quit process to fail build
      if (isProduction()) process.abort();
    });
});

gulp.task('styles', ['sass', 'scsslint']);
gulp.task('styles:dev', ['set-env-dev', 'sass', 'scsslint']);
