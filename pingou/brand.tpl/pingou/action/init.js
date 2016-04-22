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



var template = require('art-template');
template.config('base', __dirname);
//template.config('openTag', '/*{{');
//template.config('closeTag', '}}*/');

var tpl = (function () {
  var through2 = require('through2');

  template.helper('kToIndex', function (i, format) {
    i += 1;
    if (!format) return i;

    var len = ('' + format).length;
    i = 0..toFixed(len) + i;
    i = i.substring(i.length - len);
    return i;
  });

  template.helper('kToEnIndex', function (i) {
    return 'abcdefghijklmnopqrstuvwxyz'.charAt(i % 26);
  });

  template.helper('kToInt', function (i, format) {
    i += 1;
    if (!format) return i;

    var len = ('' + format).length;
    i = 0..toFixed(len) + i;
    i = i.substring(i.length - len);
    return i;
  });


  return function (data) {
    var stream = through2.obj(function (file, enc, callback) {
      var html = file.contents.toString();
      var render = template.compile(html);
      var newContent = render(data);
      file.contents = new Buffer(newContent);
      this.push(file);
      callback();
    });
    return stream;
  };
})();

/**
 * 获取图片信息
 * @param url 图片地址
 * @returns {*} promise
 */
function getImage(url){
  var defer = Q.defer();
  fs.readFile(url, function(err, file) {
    if (err) {
      defer.reject(err);
      //throw err;
    }
    else{
      var info = imageinfo(file);
      defer.resolve(info);
    }
  });
  return defer.promise;
}

var MODS_CONFIG = {
  template: false,       // 使用artTemplate模版【boolean】
  layout: 'float',   // 布局方式【string：position/float】
  bodyWidth: 1000,      // 页面宽度【number】
  imageSuffix: '.jpg',
  header: null,         // 页头模块【boolean】
  footer: null,         // 页脚模块【boolean】
  navigators: ['right'],//['right'],    // 导航模块【array：['left', 'right', 'top', 'bottom']】
  modulesLength: 24,
  modules: null,   // 常规模块【array】
  products: new Array(2),   // 产品模块【array】
  brands: new Array(2),     // 品牌模块【array】
  coupons: null            // 红包模块【array】
};

gulp.task('load-image', function(){
  var len = MODS_CONFIG.modulesLength;
  var promises = [];

  while(len--){
    var promise = getImage(`./images/warm-${len + 1}.jpg`);
    promises.unshift(promise);
  }

  return Q.all(promises).then(function(res){
    MODS_CONFIG.modules = res.map(function(image, i){
      return {
        id: i + 1,
        image: image
      };
    });
    console.log(MODS_CONFIG);
    return MODS_CONFIG;
  });
});
gulp.task('tpl-copy', function () {
  return gulp.src('./template/*.js')
    .pipe(rename({}))
    .pipe(gulp.dest('./output'));
});

gulp.task('tpl-render',['load-image'],  function () {
  return gulp.src('./template/*.tt')
    .pipe(tpl(MODS_CONFIG))
    .pipe(rename(function(file){
      file.extname = '';
    }))
    .pipe(gulp.dest('./output'));
});

gulp.task('tpl-html-min', ['tpl-render'], function () {
  var options = {
    removeComments: false,        //清除HTML注释
    collapseWhitespace: false,    //压缩HTML
    collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,      //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,     //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
    minifyJS: false,  //压缩页面JS
    minifyCSS: false  //压缩页面CSS
  };

  return gulp.src('./output/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('./output'));
});


gulp.task('init', ['tpl-copy', 'tpl-html-min'], function () {
  console.log(12333)
});

module.exports = function(){
  return new Promise(function(resolve, reject){
    gulp.run('init', function(){
      //console.log(require('./pingou_built').toString())
      //require('./pingou_built')().then(resolve);
    });
  });
};