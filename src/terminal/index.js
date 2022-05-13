
import { Terminal } from 'xterm';
import { send } from '../websocket/peer';
import { PTY } from './constants';

const terminals = new Map();

export const getPTY = (id) => {
  if (terminals.has(id)) {
    return terminals.get(id);
  }
  const pty = new Terminal();
  pty.onData((chunk) => {
    const { rows, cols } = pty;
    send(id, {
      type: PTY, chunk, rows, cols
    });
  });
  send(id, { type: PTY, chunk: '' });
  terminals.set(id, pty);
  return pty;
};

export default (id, chunk) => {
  getPTY(id).write(chunk);
};
