var path = require('path');
import koa from 'koa';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware'; // This line
//import config from './webpack.config.js';
var gulp = require('gulp');

const app = koa();

const config = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './server.js')
  ],


  output: {
    path:'./',
    filename: 'abc.js',
    publicPath: '/'
  },

  devServer: {
    inline: true,
    port: 3000
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['GeneratorFunction', 'GeneratorFunctionPrototype']
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(), // recommanded by webpack
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin() // recommanded by webpack
  ],
  module: {
    loaders: [ {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',

      query: {
        presets:['es2015', 'stage-0']
      }
    }]
  }

};


const compiler = webpack(config);

app.use(function*(){
  webpackMiddleware(compiler);

});
app.use(function*(){
  webpackHotMiddleware(compiler)
}); // And this line

//app.get('/:api', function (req, res) {
//
//  var api = req.params.api;
//  require(`./action/${api}`)().then(function () {
//    res.send(`exec ${api} over.`);
//  });
//
//});

app.get('/test', function (req, res) {


  res.send('helloa11222');

});
app.get('/init', function (req, res) {

  var task = require('./tasks/pingou_init');

  task().then(function(){
    res.jsonp({
      status: 1,
      data: '',
      code: null,
      msg: 'success'
    });
  });
});
app.get('/built', function (req, res) {

  var task = require('./tasks/pingou_built');

  task().then(function(){
    res.jsonp({
      status: 1,
      data: '',
      code: null,
      msg: 'success'
    });
  });
});
//
//app.get('/preview/:type', function (req, res) {
//
//  var param = req.param;
//
//  console.log(req)
//
//});

console.log(13112);

app.listen(3000);
