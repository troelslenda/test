'use strict';

// General utilities
const gulp = require('gulp');
const gulpif = require('gulp-if');
const fs = require('file-system');
const fsCache = require('gulp-fs-cache');
const plumber = require('gulp-plumber');
const streamqueue = require('streamqueue');
const argv = require('yargs').boolean(['development']).argv;
const {log, colors} = require('gulp-util');
// Parsers
const sourcemaps = require('gulp-sourcemaps');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Setting production environment as default
process.env.NODE_ENV = !argv.development ? 'production' : 'development';

var DEV_DEPENDENCIES = [
  'node_modules/tether/dist/js/tether.js',
  'node_modules/bootstrap/dist/js/bootstrap.js'
];

var DEPENDENCIES = [
  'node_modules/tether/dist/js/tether.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js'
];

var PATHS = [
  'js/vendor/*',
  'js/partials/*',
  'js/main.js'
];

var DEST = JSON.parse(fs.readFileSync('package.json')).directories.build.javascripts;

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
// Javascript build task
//

gulp.task('scripts', () => {
  var jsFsCache = fsCache('.tmp/jscache'); // save cache to .tmp/jscache
  var dependenciesStream = gulp.src(DEV_DEPENDENCIES)
    // Uglify in production mode
    .pipe(gulpif(isProduction(), uglify({
      preserveComments: 'license',
      compress: {
        warnings : true
      }
    })));


  var scriptsStream = gulp.src(PATHS)
    // Activate plumber in dev mode to avoid tasks ending on error
    .pipe(gulpif(!isProduction(), plumber()))
    // Initiate source maps in development mode
    .pipe(gulpif(!isProduction(), sourcemaps.init()))
    .pipe(gulpif(!isProduction(), jsFsCache))
    // Run JS Hint
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    // Fail build on warnings on JS Hint in production environment
    .pipe(gulpif(isProduction(), jshint.reporter('fail')))
    // Show proper error messages instead of 'Fatal undefined'
    .on('error', err => {
      log(colors.bgRed.white(err.message));
      // Quit process to fail build
      if (isProduction()) process.abort();
    })
    // Uglify in production mode
    .pipe(gulpif(isProduction(), uglify({
      preserveComments: 'license',
      compress: {
        warnings : true
      }
    })))
    .pipe(gulpif(!isProduction(), jsFsCache.restore))
    // Write source maps in development mode
    .pipe(gulpif(!isProduction(), sourcemaps.write()));

    // Compile scripts and merge with dependencies
    return streamqueue({ objectMode: true },
      dependenciesStream,
      scriptsStream
    )
    .pipe(concat('main.js'))
    .pipe(gulp.dest(DEST));
});

gulp.task('scripts:dev', ['set-env-dev', 'scripts']);
