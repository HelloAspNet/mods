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
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var rev  = require('gulp-rev');


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

  gulp.task('image-clean', function () {
    var options = {
      read: false
    };

    return gulp.src('./dist/images/*.{png,jpg,gif,ico}', options)
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

  gulp.task('image-min', ['image-clean'], function(){
    var options = {
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [imageminPngquant()]
    };

    return gulp.src(['./src/images/*.{png,jpg,gif,ico}'])
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/images'));
  });
  gulp.task('image-rev', ['image-min'], function(){
    var options = {
      base: './',
      merge: true // merge with the existing manifest (if one exists)
    };

    return gulp.src(['./dist/images/*.{png,jpg,gif,ico}'], {base: './dist'})
      .pipe(rev())
      .pipe(gulp.dest('./dist'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./dist'))
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


});


// 替换自定义标记
gulp.task('include', ['min'], function () {

  var options = {
    //dirname: '',
    //basename: '',
    //prefix: '',
    //suffix: '',
    //extname: '.html'
  };

  return gulp.src('./dist/*.html')
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

gulp.task('default', function(){

});