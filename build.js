
const build = require('electron-packager');

build({
  dir: '.',
  out: 'build',
  arch: 'all',
  platform: 'win32',
  ignore: [
    '.vscode',
    'build',
    'node_modules',
    'src',
    'tmp',
    'var',
    '.eslintrc',
    '.gitignore',
    'README.md',
    'renderer.js',
    'build.js',
    'server.js',
    'test.js',
    'webpack.*',
    'yarn.*'
  ],
  overwrite: true,
  icon: './assets/icon-512.icns'
});
