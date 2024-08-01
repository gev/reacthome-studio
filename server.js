const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const port = process.env.PORT || 8000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.setHeader('Content-Security-Policy', "default-src * self file: blob: data: gap:; style-src * self 'unsafe - inline' file: blob: data: gap:; script-src * 'self' 'unsafe - eval' 'unsafe - inline' file: blob: data: gap:; object-src * 'self' file: blob: data: gap:; img-src *  'unsafe - inline' file: blob: data: gap:; connect-src self * 'unsafe - inline' file: blob: data: gap:; frame-src * self file: blob: data: gap:;");
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening at http://localhost:${port}/`);
});
