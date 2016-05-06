// Dependencies
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


// Server
gulp.task('browser-sync', function() {
  browserSync.init({
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
    .pipe(browserSync.stream());
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
  gulp.watch(['*.html', 'js/*.js', 'img/*']).on('change', browserSync.reload);
});