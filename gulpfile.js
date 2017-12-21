const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile sass and inject into browser
gulp.task('sass', () => {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// Move js files to src/js
gulp.task('js', () => {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream());
});

// Watch sass & server
gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './src'
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Move font folder to src/fonts
gulp.task('fonts', () => {
  return gulp.src(['node_modules/font-awesome/fonts/*'])
  .pipe(gulp.dest('src/fonts'));
});

// Move font awesome css to src/css
gulp.task('fa', () => {
  return gulp.src(['node_modules/font-awesome/css/font-awesome.min.scss'])
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
