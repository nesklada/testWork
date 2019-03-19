const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    webserver = require('gulp-webserver'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

var path = {
    css: './css/',
    scss: this.css + 'site.scss'
}

gulp.task('style', function () {
    return gulp.src(path.scss)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(path.css))
      .pipe(cssmin())
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(path.css));;
  });

gulp.task('watch', function () {
    gulp.watch(path.css + '**/*.scss', ['style']);
});

gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
        open: true,
        port: 8008
      }));
  });

gulp.task('build', ['style']);
gulp.task('default', ['watch','webserver']);