const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const port = process.env.PORT || 8080;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening at http://localhost:${port}/`);
});
