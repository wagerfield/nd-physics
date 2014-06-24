var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('scripts', function() {
  return gulp.src([
      'source/**/*.js',
    ])
    .pipe(plugins.concat('nd-physics.js'))
    .pipe(gulp.dest('deploy'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('deploy'));
});

gulp.task('clean', function() {
  return gulp.src('deploy', {read: false})
    .pipe(plugins.clean());
});

gulp.task('watch', function() {
  gulp.watch('source/**/*.js', ['scripts']);
});

gulp.task('build', ['scripts']);

gulp.task('default', ['build'], function() {
  gulp.start('watch');
});
