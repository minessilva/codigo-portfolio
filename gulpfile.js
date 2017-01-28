// SHORT GULP INTRO
// in order to run this code, you need to install -Node.js
// and run on your terminal, on this location, "npm install". This will install the project's dependencies! :)
// you also have to install gulp globally so run "npm install -g gulp"
//
// after this you can run this code in two ways:
// 1) by writing "gulp" on your terminal, and watching things run...
// 2) by writing "gulp minify" in order to minify your css!


var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cp           = require('child_process'),
    jekyll       = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll',
    messages = {
        jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
    },
    debug        = false;

gulp.task('debug', function(){
  debug = true;
  console.log("\n W E L C O M E   T O  D E B U G   M O D E \n\n   Your scripts and css are no longer minified! WOOHOO!\n   Don't forget to execute 'gulp' before you commit / push any changes!\n   Happy codin!\n\n");
});


//  Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});
// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});
// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });

    gulp.watch(['_sass/**/*.scss', '_sass/*.scss'], ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html','_posts/*'], ['jekyll-rebuild']);
});

// Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
gulp.task('sass', function(){
  return gulp.src('_sass/main.scss')
    .pipe(sass(debug ? {includePaths: ['scss']} : { includePaths: ['scss'], outputStyle:'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'safari 6', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('css'));
});

// watch for changes in the following files
gulp.task('serve', function(){

});

// tasks
gulp.task('minify', ['browser-sync', 'serve']);
gulp.task('default', ['debug', 'browser-sync', 'serve']);
