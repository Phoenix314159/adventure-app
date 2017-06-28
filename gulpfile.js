const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    CacheBuster = require('gulp-cachebust'),
    cachebust = new CacheBuster(),
    print = require('gulp-print'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    gulpBrowser = require("gulp-browser"),
    transforms = [{
        transform: "babelify",
        options: {presets: ["es2015"]}
    }]

gulp.task('build-js', function () {
    let stream = gulp.src('./client/js/**/*.js')
        .pipe(gulpBrowser.browserify(transforms))
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(concat('bundle.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
    return stream
})

gulp.task('views', () => {
    return gulp.src('./client/views/**/*')
        .pipe(gulp.dest('./dist/views'))
})

gulp.task('build-css', () => {
    return gulp.src('./client/styles/**/*')
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(concat('styles.min.css'))
        .pipe(cssmin())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/styles'))
})

gulp.task('icons', () => {
    gulp.src('./client/icons/**/*')
        .pipe(gulp.dest('./dist/icons'))
})

gulp.task('build', ['views', 'build-css', 'build-js', 'icons'], () => {
    return gulp.src('./client/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
    return gulp.watch(['./client/index.html', './client/styles/**/*', './client/js/**/*', './client/views/**/*'], ['build']);
})

gulp.task('default', ['watch', 'build'])


