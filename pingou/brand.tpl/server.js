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

app.use(express.static(__dirname + '/dist'));
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler)); // And this line

//app.get('/:api', function (req, res) {
//
//  var api = req.params.api;
//  require(`./action/${api}`)().then(function () {
//    res.send(`exec ${api} over.`);
//  });
//
//});



app.get('/test', function (req, res) {


    res.send('helloa1');

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

app.get('/preview/:type', function (req, res) {
  var params = req.params;
  res.send();
});


app.listen(3000);