const gulp = require('gulp');
const exec = require('child_process').exec;

gulp.task('hello', function() {
	console.log("Hello World!");
});

gulp.task('dev', function(callback) {
	exec('node src/js/main.js');
});