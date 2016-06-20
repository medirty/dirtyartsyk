var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

//STYLES

//gulp.task('sass', function () {
//    return gulp.src('scss/**/*.scss')
//        .pipe(plumber())
//        .pipe(sass({
//                outputStyle: 'compressed'
//            })
//            .on('error', sass.logError))
//        .pipe(prefix())
//        .pipe(gulp.dest('dist/css'));
//});


//JS

gulp.task('scripts', function () {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

//IMAGEMIN

gulp.task('imagemin', function () {

    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'))

});


//BROWSERSYNC

gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("src/scss/**/*.scss")
        .pipe(prefix())
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});


//WATCH

//gulp.task('watch', function () {
//    gulp.watch('js/*.js', ['scripts']);
//    gulp.watch('scss/**/*.scss', ['sass']);
//});


gulp.task('default', ['scripts', 'sass', 'imagemin', 'serve']);
