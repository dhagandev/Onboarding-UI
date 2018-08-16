const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('hello', function() {
	console.log("Hello World!");
});

gulp.task('dev', function() {
	connect.server({
		root: ['src', 'src/css'],
		port: 9000
	});
});