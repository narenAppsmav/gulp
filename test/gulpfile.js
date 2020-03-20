var gulp = require('gulp');
let uglify = require('gulp-uglify-es').default;
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var server = require('gulp-webserver');
 
gulp.task("uglify", function () {
    return gulp.src(['./test-1.js', './test-2.js'])
    .pipe(concat('./test.js'))
    .pipe(browserify({
        insertGlobals : true,
        debug : true
    }))
    .pipe(uglify())
    .pipe(gulp.dest("public/dist/js"));
});

gulp.task('less', function(){
	return gulp.src('./test.less')
    .pipe(less())
    .pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('public/dist/css'))
});

gulp.task('images', function(){
	return gulp.src('./out/**/*.+(png|jpg|gif|svg)')
	.pipe(imagemin())
	.pipe(gulp.dest('public/dist/images'))
});

gulp.task('server', function() {
	gulp.src('./public/')	// Your app folder
	.pipe(server({
        fallback: './public/index.html',
        livereload: true,
		open: true
	}));
});

gulp.task('watch', function(){
    gulp.watch('./test.less', gulp.series(['less'])); 
    gulp.watch(['./test-1.js', './test-2.js'], gulp.series(['uglify'])); 
    gulp.watch('./out/**/*.+(png|jpg|gif|svg)', gulp.series(['images'])); 
});

gulp.task('default', gulp.series( 'uglify', 'less', 'images', 'server', 'watch') );