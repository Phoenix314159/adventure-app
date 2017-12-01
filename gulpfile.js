const gulp = require('gulp'),
  {sourcemaps: {init, write}, babel,
    htmlmin, cachebust, browser: {browserify},
    cssmin, print, concat, ngAnnotate, uglify, sass} = require('gulp-load-plugins')({
    pattern: ['gulp-*'],
    replaceString: /\bgulp[\-.]/,
    lazy: true,
    camelize: true
  }),
  cache = new cachebust(),
  transforms = [{
    transform: 'babelify'
  }],
  babelConfig = {
    presets: ['es2015', 'es2017'],
    plugins: ['transform-runtime']
  }

gulp.task('icons', () => {
  gulp.src('./client/icons/**/*')
    .pipe(gulp.dest('./dist/icons'))
})

gulp.task('build-js', function () {
  return gulp.src('./client/js/**/*.js')
    .pipe(init())
    .pipe(babel(babelConfig))
    .pipe(browserify(transforms))
    .pipe(print())
    .pipe(concat('bundle.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(write('./'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('build-css', () => {
  return gulp.src('./client/styles/**/*.scss')
    .pipe(init())
    .pipe(print())
    .pipe(sass()).on('error', sass.logError)
    .pipe(cache.resources())
    .pipe(concat('styles.min.css'))
    .pipe(cssmin())
    .pipe(write('./maps'))
    .pipe(gulp.dest('./dist/styles'))
})

gulp.task('views', () => {
  return gulp.src('./client/views/**/*')
    .pipe(print())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/views'))
})

gulp.task('build', ['build-js', 'views', 'icons'], () => {
  return gulp.src('./client/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(cache.resources())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  return gulp.watch(['client/index.html', 'client/styles/**/*', 'client/js/**/*', 'client/views/**/*'], ['build'])
})

gulp.task('default', ['watch', 'build'])


