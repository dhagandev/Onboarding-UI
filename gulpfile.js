const gulp = require('gulp');
const connect = require('gulp-connect');
const browserify = require('browserify');
const babelify = require('babelify');
const log = require('fancy-log');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');

// Example gulp task
gulp.task('hello', function() {
    console.log("Hello World!");
});

// Creates the server and connects to a given root (host) and port
gulp.task('server', function() {
    connect.server({
        root: ['src', 'dist'],
        port: 9000
    });
});

// Generates a css file based off the scss file given
gulp.task('sass', function() {
    return gulp.src('src/scss/styles.scss')
               .pipe(sass())
               .pipe(gulp.dest('src/css'));
})

function bundle(b) {
	return b.bundle()
			.on('error', function (err) { // If there is an error, log it and emit end so that any watch processes know
				log(err.toString());
				this.emit('end');
			})
			.pipe(source('bundle.js')) // Converts the stream into what gulp is expecting
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true})) // Once the src/js files are bundled, the source map will tell you which file in the bundle caused an error
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
		}) // Lets you use require in files under src/js
		.transform(babelify) //Converts the syntax to be readable by browsers
		.bundle()
		.on('error', function (err) { // If there is an error, log it and emit end so that any watch processes know
			log(err.toString());
			this.emit('end');
		})
		.pipe(source('bundle.js'))  // Converts the stream into what gulp is expecting
		.pipe(gulp.dest('./dist/js/')) // Write file to this directory
		.pipe(connect.reload()); // Causes the server to reload each execution
});

//Alias task dev to perform js, sass, server in that order
gulp.task('dev', ['sass', 'js', 'server']);