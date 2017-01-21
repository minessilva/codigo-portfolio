// SHORT GULP INTRO
// in order to run this code, you need to install -Node.js
// and run on your terminal, on this location, "npm install". This will install the project's dependencies! :)
// you also have to install gulp globally so run "npm install -g gulp"
//
// after this you can run this code in two ways:
// 1) by writing "gulp" on your terminal, and watching things run...
// 2) by writing "gulp minify" in order to minify your css!


var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    debug = false;

gulp.task('debug', function(){
  debug = true;
  console.log("\n W E L C O M E   T O  D E B U G   M O D E \n\n   Your scripts and css are no longer minified! WOOHOO!\n   Don't forget to execute 'gulp' before you commit / push any changes!\n   Happy codin!\n\n");
});

// task manager
gulp.task('sass', function(){
  return gulp.src('./scss/*.scss')
    .pipe(sass(debug ? "" : {outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'safari 6', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function(){
  browserSync.init({
    server:{
      baseDir: './'
    },
  });

  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

// tasks
gulp.task('minify', ['sass']);
gulp.task('default', ['debug', 'sass', 'serve']);
