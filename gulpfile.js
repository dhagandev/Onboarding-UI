const gulp = require('gulp');
const connect = require('gulp-connect');
const browserify = require('browserify');
const babelify = require('babelify');
const log = require('fancy-log');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');

gulp.task('hello', function() {
    console.log("Hello World!");
});

gulp.task('server', function() {
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
				log(err.toString());
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
			log(err.toString());
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(connect.reload());
});

gulp.task('dev', ['js', 'sass', 'server']);