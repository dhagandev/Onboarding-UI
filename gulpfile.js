const gulp = require('gulp');
const connect = require('gulp-connect');
const exec = require('child_process').exec;
const sass = require('gulp-sass');

gulp.task('hello', function() {
    console.log("Hello World!");
});

gulp.task('dev', function() {
    exec('gulp sass');
    connect.server({
        root: 'src',
        port: 9000
    });
});

gulp.task('sass', function() {
    return gulp.src('src/scss/styles.scss')
               .pipe(sass())
               .pipe(gulp.dest('src/css'));
})