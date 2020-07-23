
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FitAddon } from 'xterm-addon-fit';
import { getPTY } from '../terminal';
import { send } from '../websocket/peer';
import { PTY } from '../terminal/constants';

class Container extends Component {
  componentDidMount() {
    const { daemon } = this.props;
    const pty = getPTY(daemon);
    const fitAddon = new FitAddon();
    pty.loadAddon(fitAddon);
    pty.open(this.ref);
    window.addEventListener('resize', () => {
      fitAddon.fit();
      const { rows, cols } = pty;
      send(daemon, { type: PTY, rows, cols });
    });
    fitAddon.fit();
  }

  render() {
    return (
      <div
        className="container"
        ref={(e) => { this.ref = e; }}
      />
    );
  }
}

export default connect(({ pool }, { id }) => pool[id] || {})(Container);
