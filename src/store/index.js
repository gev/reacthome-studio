import dev from './dev';
import prod from './prod';

const isDevMode = process.execPath.match(/[\\/]electron/);

export default isDevMode ? dev : prod;
