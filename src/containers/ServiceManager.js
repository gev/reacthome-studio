
import { Component } from 'react';
import { createSocket } from 'dgram';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  SERVICE_PORT,
  SERVICE_GROUP,
  DISCOVERY_INTERVAL
} from '../constants';
import { dispatchAction, offline, discovery } from '../actions';

type Props = {
  daemon: [],
  children: Children,
  offline: (id: string) => void,
  discovery: (id: string) => void,
  dispatchAction: (action: {}, address: string) => void
};

class ServiceManager extends Component<Props> {
  componentWillMount() {
    const { daemon = [] } = this.props;
    daemon.forEach(this.props.offline);
    this.socket = createSocket('udp4');
    this.socket
      .on('error', console.log)
      .on('message', (data, { address }) => {
        try {
          this.props.dispatchAction(JSON.parse(data), address);
        } catch (err) {
          console.log(err);
        }
      })
      .bind(SERVICE_PORT, () => {
        this.socket.addMembership(SERVICE_GROUP);
      });
    this.startDiscovery(daemon);
  }

  componentWillReceiveProps({ daemon = [] }) {
    clearInterval(this.timer);
    this.startDiscovery(daemon);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.socket.close();
  }

  startDiscovery(daemon) {
    this.timer = setInterval(() => {
      daemon.forEach(this.props.discovery);
    }, 5 * DISCOVERY_INTERVAL);
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  ({ pool }) => pool.root || {},
  dispatch => bindActionCreators({ dispatchAction, offline, discovery }, dispatch)
)(ServiceManager);
