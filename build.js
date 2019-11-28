
const os = require('os');
const build = require('electron-packager');

const icon = () => {
  switch (os.platform()) {
    case 'darwin': return 'icon-512.icns';
    case 'win32': return 'icon-256.ico';
    default: return 'icon-512.png';
  }
};

build({
  dir: '.',
  out: 'build',
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
  icon: `./assets/${icon()}`
});
