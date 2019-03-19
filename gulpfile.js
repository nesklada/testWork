var gulp = require('gulp'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    webserver = require('gulp-webserver'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer')
    rename = require('gulp-rename');

var pathCSS = './css/';

var pages = {
    home: pathCSS + 'site.scss'
}

gulp.task('style', function () {
    return gulp.src(pages.home)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(pathCSS))
      .pipe(cssmin())
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(pathCSS));;
  });

gulp.task('watch', function () {
    gulp.watch(pathCSS + '**/*.scss', ['style']);
});

gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
        open: true,
        port: 8008
      }));
  });

gulp.task('default', ['watch','webserver']);