var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var critical = require('critical').stream;

gulp.task("default", function () {
  gulp.src('sass/style.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('wiki-search/css/'));
});

gulp.task("watch", function () {
  gulp.watch('sass/style.sass', function() {
    gulp.src('sass/style.sass')
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(autoprefixer())
      .pipe(gulp.dest('wiki-search/css/'));
  });
});

gulp.task("print", function(){
     gulp.src(
        'wiki-search/index.html')
    .pipe(gulp.dest('public/'));
     gulp.src(
        'wiki-search/404.html')
    .pipe(gulp.dest('public/'));
    gulp.src(
      'wiki-search/css/**/*')
      .pipe(gulp.dest('public/css/'));
    gulp.src(
      'wiki-search/js/**/*')
      .pipe(gulp.dest('public/js/'));
    gulp.src(
      'wiki-search/img/**/*')
      .pipe(gulp.dest('public/img/'));
});

// Generate, Minify, & Inline Critical-path CSS NOT WORKING
gulp.task('critical', function () {
    return gulp.src('critical.html')
        .pipe(critical({base: '/home/vicky/data/repos/wiki-viwer-v2/', inline: true, minify:true, css: ['wiki-search/css/style.css']}))
        .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        .pipe(gulp.dest('/home/vicky/data/repos/wiki-viwer-v2/critical/'));
});
