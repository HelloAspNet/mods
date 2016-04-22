var Q = require('q');
var fs = require('fs');
var imageinfo = require('imageinfo');

//var browserify = require('browserify');
var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var minifyCSS = require('gulp-minify-css');
var spriter = require('gulp-css-spriter');
var clean = require('gulp-clean');
var contentIncluder = require('gulp-content-includer');
var less = require('gulp-less');
var replace = require('gulp-replace');

// clean
(function () {
  gulp.task('clean', function () {
    var options = {
      read: false
    };
    return gulp.src('./dist', options)
      .pipe(clean());
  });

  gulp.task('html-clean', function () {
    var options = {
      read: false
    };

    return gulp.src('./dist/*.html', options)
      .pipe(clean());
  });

  gulp.task('css-clean', function () {
    var options = {
      read: false
    };

    return gulp.src('./dist/*.css', options)
      .pipe(clean());
  });

  gulp.task('js-clean', function () {
    var options = {
      read: false
    };

    return gulp.src('./dist/*.js', options)
      .pipe(clean());
  });
})();

// min
(function () {

  gulp.task('min', ['html-min', 'css-min', 'js-min']);

  gulp.task('html-min', ['html-clean'], function () {
    var options = {
      removeComments: true,       //清除HTML注释
      collapseWhitespace: false,  //压缩HTML
      collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,      //删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,     //删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
      minifyJS: false,  //压缩页面JS
      minifyCSS: false  //压缩页面CSS
    };

    return gulp.src('./src/*.html')
      .pipe(htmlmin(options))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('css-min', ['css-clean'], function () {
    var options = {
      keepBreaks: true  //是否保留换行
    };

    return gulp.src('./src/*.less')
      .pipe(less())
      .pipe(minifyCSS(options))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('js-min', ['js-clean'], function () {
    var options = {
      mangle: false,
      output: {
        beautify: true
      },
      compress: {
        sequences: false,   //把语句用逗号连接起来
        drop_console: true,
        booleans: false,    //转换布尔值
        join_vars: false
      }
    };

    return gulp.src(['./src/*.js'])
      .pipe(uglify(options))
      .pipe(gulp.dest('./dist'));
  });
})();


gulp.task('concat', function () {

  // libs
  gulp.src([
    './js/template.js',
    './js/zepto.min.js'
  ]).pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist/'));

  // photoswipe
  gulp.src([
    './photoswipe/photoswipe.min.js',
    './photoswipe/photoswipe-ui-default.min.js'
  ]).pipe(concat('photoswipe.js'))
    .pipe(gulp.dest('./dist/'));

});

gulp.task('copy', function () {
  //return gulp.src('./src/**.{}', )
  //  .pipe(gulp.dest('./dist'));
});


gulp.task('include', ['min'], function () {

  var options = {
    //dirname: '',
    //basename: '',
    //prefix: '',
    //suffix: '',
    //extname: '.html'
  };

  return gulp.src('./dist/*.html')

    .pipe(replace(/(<link[^>]+["'].+\?__insert["'][^>]*(\/)?>)/g, '<style>\n$1\n</style>'))
    .pipe(replace(/(<script[^>]+["'].+\?__insert["'][^>]*><\/script>)/g, '<script>\n$1\n</script>'))
    .pipe(contentIncluder({includerReg: /<link[^>]+["'](.+)\?__insert["'][^>]*(\/)?>/g}))
    .pipe(contentIncluder({includerReg: /<script[^>]+["'](.+)\?__insert["'][^>]*><\/script>/g}))

    .pipe(contentIncluder({
      includerReg: /[\t ]*\/\*#\s+include=([^ ]+)\s+\*\//g
    }))
    .pipe(rename(options))
    .pipe(gulp.dest('./dist'));
});


gulp.task('built', ['include'], function () {
  return gulp.src('./dist/*.html')
    .pipe(replace(/[\r\n]+\s*[\r\n]+/g, '\r\n'))
    .pipe(gulp.dest('./dist'));
});

module.exports = function(){
  return new Promise(function(resolve, reject){
    gulp.run('built', resolve);
  });
};