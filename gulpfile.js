const gulp = require('gulp');
const connect = require('gulp-connect');
// const exec = require('child_process').exec;
const sass = require('gulp-sass');

gulp.task('hello', function() {
    console.log("Hello World!");
});

gulp.task('server', function() {
    // exec('gulp sass');
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

function bundle(b) {
	return b.bundle()
			.on('error', function (err) {
				gutil.log(err.toString());
				this.emit('end');
			})
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			// Add transformation tasks to the pipeline here.
			// .pipe(config.production ? uglify() : gulpUtil.noop())
			.pipe(sourcemaps.write('./'))
			// .pipe(gulp.dest('./build' + config.versionPath + '/js/'));
			.pipe(gulp.dest('./dist/js/'));
}

gulp.task('js', function() {
	return browserify({
			debug: true,
			entries: ['./src/js/main.js'],
			paths: ['./src/js', './node_modules'],
			cache: {},
			packageCache: {}
		})
		.transform(babelify)
		.bundle()
		.on('error', function (err) {
			gutil.log(err.toString());
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(connect.reload());
});

gulp.task('dev', ['sass', 'server']);