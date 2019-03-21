let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    webserver = require('browser-sync'),
    rename = require('gulp-rename');

const config = {
    server: {
        baseDir: '.'
    },
    tunnel: true,
    host: 'localhost',
    open: 'external',
    port: 3000,
    logPrefix: "server"
};

const path = {
    src: './src/',
    scss: './src/scss/site.scss',
    dist: {
        css: './css/'
    },
    watch: {
        scss: './src/scss/'
    }
};

gulp.task('webserver', function (done) {
    browserSync.init(config);
    done();
});

gulp.task('scss:build', (done) => {
    gulp.src(path.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(cssmin())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.reload({ stream: true }));
    done();
});

gulp.task('watch', function () {
    gulp.watch(path.watch.scss, gulp.series('scss:build'));
});

gulp.task('build', gulp.series('scss:build'));
gulp.task('default', gulp.series('webserver', 'watch'));