var gulp = require("gulp");

// Path variables
var urlPath = 'http://www.shouldiuseagenderdropdown.com';
var themePath = '/';
var cssPath = 'css';
var sassPath = 'sass';
var jsPath = 'js';
var imgPath = 'img';
var styleguidePath = 'documentation/styleguide';

// Sass
var sass = require("gulp-sass");
var bulkSass = require('gulp-sass-bulk-import');
var moduleImporter = require('sass-module-importer');

// Preprocess plugins
var postcss = require('gulp-postcss');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

// Images
var images = require('gulp-imagemin');

// Documentation
var sassdoc = require('sassdoc');
var jsdoc = require("gulp-jsdoc3");
var styleguide = require('sc5-styleguide');

// Gulp plugins
var cache = require('gulp-cache');
var rm = require('gulp-rm');
var notify = require("gulp-notify");
var shell = require('gulp-shell');
var size = require('gulp-size');
var rename = require('gulp-rename');
var browserSync = require("browser-sync");
var reload = browserSync.reload;


//
// Compile Sass
//

gulp.task('sass', function () {
  return gulp.src(sassPath + '/app.scss')

  // Get Sass inside folders ("folder/*" syntax")
  .pipe(bulkSass())

  // Import Sass from Bower and Node modules
  .pipe(sass({ importer: moduleImporter() }))

  // Convert Sass into CSS
  .pipe(sass({
    includePaths: ['sass'],
    sourcemap: true,
    sourceComments: 'normal',
    onError: function(err) {
      return notify().write(err);
    }
  }))

  // Catch any Sass errors and prevent them from crashing gulp
  .on('error', function (error) {
    console.error(error);
    this.emit('end');
  })

  // Load existing internal sourcemap
  .pipe(sourcemaps.init({loadMaps: true}))

  // Autoprefix properties
  .pipe(postcss([autoprefixer({
    browsers: ['last 2 versions']
  }) ]))

  // Write final .map file
  .pipe(sourcemaps.write())

  // Save the CSS
  .pipe(gulp.dest(cssPath))

  // Get file size (gzipped)
  .pipe(size({
    gzip: true
  }))

  // Notify to say the task has complete
  .pipe(notify({
    message: 'Sass compiling complete',
    onLast: true
  }))

  // Filtering stream to only css files
  .pipe(filter(sassPath + '/**/*.css'))

  .pipe(browserSync.reload({stream:true}));
});


//
// Compile JavaScript
//

gulp.task('js', function () {
  return gulp.src(jsPath + '/**/*.js')
  .pipe(gulp.dest(jsPath))

  // Notify to say the task has complete
  .pipe(notify({
    message: 'JavaScript compiling complete',
    onLast: true
  }))
});


//
// Compress images
//

gulp.task('images', function() {
  gulp.src(imgPath + '/*')

  .pipe(cache(images({
    optimizationLevel: 4,
    progressive: true,
    interlaced: true
  })))

  .pipe(gulp.dest(imgPath + '/min/'))

  // Notify to say the task has complete
  .pipe(notify({
    message: 'Image compression complete',
    onLast: true
  }))
});


//
// Compile JSDoc
//

gulp.task('jsdoc', function (cb) {
  var jsdocConfig = require('./jsdocConfig.json');
  gulp.src(['README.md', jsPath + '/**/*.js'], {read: false})

  .pipe(jsdoc(jsdocConfig, cb))

  // Notify to say the task has complete
  .pipe(notify({
  message: 'JSDoc update complete',
    onLast: true
  }))
});


//
// Compile SassDoc
//

gulp.task('sassdoc', function () {
  return gulp.src(sassPath + '/**/*.scss')

  .pipe(sassdoc({
    dest: './documentation/sassdoc'
  }))

  // Notify to say the task has complete
  .pipe(notify({
    message: 'SassDoc update complete',
    onLast: true
  }))
});


//
// Compile SC5 Styleguide
//

gulp.task('styleguide:generate', function() {

  // Get the Sass
  return gulp.src([sassPath + '/**/*.scss'])

  .pipe(styleguide.generate({
      title: '"Should I use a gender dropdown?" style guide',
      server: false,
      rootPath: styleguidePath,
      appRoot: themePath + styleguidePath,
      overviewPath: 'documentation/styleguide.md'
    }))

  .pipe(gulp.dest(styleguidePath))
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src([sassPath + '/app.scss'])

    .pipe(bulkSass())

    .pipe(sass({
      errLogToConsole: true
    }))

    .pipe(styleguide.applyStyles())

    .pipe(gulp.dest(styleguidePath))

  // Notify to say the task has complete
  .pipe(notify({
    message: 'Styleguide update complete',
    onLast: true
  }))
});

gulp.task('styleguide-watch', ['styleguide'], function() {
  gulp.watch([sassPath + '/**/*.scss'], ['styleguide']);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);


//
// Run BrowserSync
//

gulp.task('browser-sync', function() {

  // Watch files
  var files = [
    cssPath + '/app.css',
    jsPath + '/**/*.js',
    imgPath + '/**/*',
    './*.html'
  ];

  // Initialize BrowserSync
  browserSync.init(files, {
    notify: true,
    open: false,
    server: {
      baseDir: "./"
    }
  });
});


//
// Default task to be run with `gulp`
//

gulp.task('default', ['sassdoc', 'styleguide', 'sass', 'jsdoc', 'js', 'images', 'browser-sync'], function () {
  gulp.watch(sassPath + '/**/*.scss', ['sassdoc', 'styleguide', 'sass']);
  gulp.watch(jsPath + '/**/*.js', ['jsdoc', 'js']);
  gulp.watch(imgPath + '/*' , ['images']);
});
