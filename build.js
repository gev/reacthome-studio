
const os = require('os');
const build = require('electron-packager');
const path = require('path');
const fs = require('fs');

const icon = () => {
  switch (os.platform()) {
    case 'darwin': return './assets/icon-512.icns';
    case 'win32': return '.\\assets\\icon-256.ico';
    default: return './assets/icon-512.png';
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
  afterCopy: [
    (buildPath, electronVersion, platform, arch, callback) => {
      [
        "./node_modules/@electron/remote/dist/src/common",
        "./node_modules/@electron/remote/dist/src/main",
        "./node_modules/@electron/remote/main",
      ].forEach(dir => {
        fs.mkdirSync(path.join(buildPath, dir), { recursive: true });
      });
      [
        "./node_modules/@electron/remote/dist/src/common/get-electron-binding.js",
        "./node_modules/@electron/remote/dist/src/common/ipc-messages.js",
        "./node_modules/@electron/remote/dist/src/common/module-names.js",
        "./node_modules/@electron/remote/dist/src/common/type-utils.js",
        "./node_modules/@electron/remote/dist/src/main/objects-registry.js",
        "./node_modules/@electron/remote/dist/src/main/server.js",
        "./node_modules/@electron/remote/dist/src/main/index.js",
        "./node_modules/@electron/remote/main/index.js",
      ].forEach(file => {
        fs.copyFileSync(path.join(__dirname, file), path.join(buildPath, file));
      });
      callback();
    }
  ],
  asar: true,
  overwrite: true,
  icon: icon()
});
