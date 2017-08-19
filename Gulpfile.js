// Gulpfile
const gulp = require('gulp'); 
const uglify  = require('gulp-uglify');
const rename  = require('gulp-rename');
const stylus = require('gulp-stylus');
const nib = require('nib');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const source = require('vinyl-source-stream');


gulp.task('styles', () => {
	return gulp
		.src('./src/styles/styles.styl')
		.pipe(stylus({
			compress: true,
			use: nib()
		}))
		.pipe(gulp.dest('./assets/css'))
});

gulp.task('scripts', () => {

	var bundler = browserify({
			entries: ['./src/js/scripts.js']
		}).transform(babelify.configure({
			presets : ["es2015"]
		}))

	var bundle = () => {

		return bundler.bundle()
            .pipe(source('scripts.js'))
            .pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest('./assets/js'))

	}

	return bundle()

});

gulp.task('watch', () => {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/styles/*.styl', ['styles']);
});


gulp.task('default', ['styles', 'scripts', 'watch']);
