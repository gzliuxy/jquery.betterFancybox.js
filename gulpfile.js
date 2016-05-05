// Dependencies
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');


// Server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: '.'
    },
    notify: false,
    startPath: '/index.html'
  });
});


// Sass
gulp.task('styles:sass', function() {
  return gulp.src(['css/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Build
gulp.task('build', ['styles:sass']);


// Build and serve
gulp.task('build:serve', ['build'], function() {
  gulp.start('browser-sync');
});


// Default task
gulp.task('default', ['build:serve'], function() {
  gulp.watch(['css/*.scss'], ['styles:sass']);
});