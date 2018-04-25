let gulp = require('gulp');
let watch = require('gulp-watch');
let sass = require('gulp-sass'); 
let browserSync = require('browser-sync').create();

// Compile Sass & inject into browser 

gulp.task('sass', function() {
    return gulp.src('./docs/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', function(errorInfo){
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./docs/css'))
});

// Watch Sass

gulp.task('watch', ['sass'], function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './docs'
        }
    });
    watch('./docs/index.html', function() {
        browserSync.reload();
    });
    watch('./docs/scss/**/*.scss', function() {
        gulp.start('sassInject');
    });
});

gulp.task('sassInject', ['sass'], function() {
    return gulp.src('./docs/css/style.css')
      .pipe(browserSync.stream());
  });