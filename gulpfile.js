'use strict';

const gulp          = require('gulp');
const gutil         = require('gulp-util');
const concat        = require('gulp-concat');
const cssnano       = require('gulp-cssnano');
const uglify        = require('gulp-uglify');
const livereload    = require('gulp-livereload');
const ngAnnotate    = require('gulp-ng-annotate');
const htmlmin       = require('gulp-htmlmin');
const stylus        = require('gulp-stylus');
const templateCache = require('gulp-angular-templatecache');
const wiredep       = require('wiredep');

const debug = require('debug')('delivery-admin:gulp');
const pkg = require('./package.json');

const DEPENDENCIES = wiredep(pkg.wiredep);

let cssPath = {
  source: 'src/css/app.css',
  target: 'public/assets/css'
};
let jsPath = {
  source: ['src/app/**/*.module.js', 'public/assets/js/templates.min.js', 'src/app/**/*!(module).js'],
  target: 'public/assets/js'
};

// debug('DEPENDENCIES.js', DEPENDENCIES, DEPENDENCIES.js);

// jsPath.source = DEPENDENCIES.js.concat(jsPath.source);
cssPath.source = DEPENDENCIES.css.concat(cssPath.source);

function stylusCss() {
  return gulp.src('src/css/app.styl')
    .pipe(stylus({
        compress: true
      })
    )
    .pipe(gulp.dest('src/css/'));
}

function myCss() {
  return gulp.src(cssPath.source)
    .pipe(cssnano({ discardComments: {removeAll: true} }))
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(cssPath.target))
    .pipe(livereload());
}
function jsVendor() {
  return gulp.src(DEPENDENCIES.js)
    .pipe(concat('vendors.min.js'))
    .pipe(uglify({ mangle: true }).on('error', gutil.log))
    .pipe(gulp.dest(jsPath.target));
}

function jsApp() {
  return gulp.src(jsPath.source)
    .pipe(concat('all.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({ mangle: true }).on('error', gutil.log))
    .pipe(gulp.dest(jsPath.target))
    .pipe(livereload());
}

function jsTemplate() {
  return gulp.src('src/app/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
      root: '/',
      filename: 'templates.min.js'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(jsPath.target))
    .pipe(livereload());
}

const css = gulp.series(stylusCss, myCss);
const js = gulp.series(jsTemplate, jsApp);

const build = gulp.parallel(css, js, jsVendor);
const watch = gulp.parallel(css, js);

exports.css = css;
exports.js = js;
exports.watch = watch;
exports.default = build;
