
const gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*'],
        replaceString: /\bgulp[\-.]/,
        lazy: true,
        camelize: true
    }),
    cachebust = new $.cachebust(),
    transforms = [{
        transform: "babelify",
        options: {presets: ["es2015"]}
    }]

gulp.task('icons', () => {
    gulp.src('./client/icons/**/*')
        .pipe(gulp.dest('./dist/icons'))
})

gulp.task('build-js', function () {
    return gulp.src('./client/js/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.browser.browserify(transforms))
        .pipe($.print())
        .pipe($.concat('bundle.min.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('build-css', () => {
    return gulp.src('./client/styles/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.print())
        .pipe($.sass())
        .pipe(cachebust.resources())
        .pipe($.concat('styles.min.css'))
        .pipe($.cssmin())
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/styles'))
})

gulp.task('views', () => {
    return gulp.src('./client/views/**/*')
        .pipe($.print())
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/views'))
})

gulp.task('build', ['build-js', 'build-css', 'views', 'icons'], () => {
    return gulp.src('./client/index.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
    return gulp.watch(['./client/index.html', './client/styles/**/*', './client/js/**/*', './client/views/**/*'], ['build']);
})

gulp.task('default', ['watch', 'build'])


