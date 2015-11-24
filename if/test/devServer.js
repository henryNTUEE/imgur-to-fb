var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
require('node-jsx').install({ extension: '.js', harmony: true });

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:3000');
});