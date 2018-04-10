
import { Component } from 'react';
import { createSocket } from 'dgram';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SERVICE_PORT, SERVICE_GROUP, DAEMON, ROOT } from '../constants';
import { dispatchAction, offline } from '../actions';

type Props = {
  daemon: [],
  children: Children,
  offline: (id: string) => void,
  dispatchAction: (action: {}, port: number, address: string) => void
};

class ServiceManager extends Component<Props> {
  componentWillMount() {
    this.props.daemon.forEach(this.props.offline);
    this.socket = createSocket('udp4');
    this.socket
      .on('error', console.log)
      .on('message', (data, { address, port }) => {
        try {
          this.props.dispatchAction(JSON.parse(data), port, address);
        } catch (err) {
          console.log(err);
        }
      })
      .bind(SERVICE_PORT, () => {
        this.socket.addMembership(SERVICE_GROUP);
      });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  ({ pool }) => ({ daemon: (pool[ROOT] || {})[DAEMON] || [] }),
  dispatch => bindActionCreators({ dispatchAction, offline }, dispatch)
)(ServiceManager);
