var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  // return gulp.src(['./src/js/modules/*.js', './src/sketch.js'])
  return gulp.src(['./src/js/helper/*.js', './src/js/*.js', './src/sketch.js'])
    .pipe(concat('spaceship.min.js'))
    .pipe(uglify())
    .pipe(minify())
    .pipe(gulp.dest('./public/js'));
});
gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['scripts']);
});

gulp.task('default', ['scripts']);
