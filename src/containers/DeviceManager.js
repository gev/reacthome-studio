
import { Component } from 'react';
import { createSocket } from 'dgram';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addDevice, removeDevice } from '../actions';
import { IP, DEVICES_PORT, DEVICES_GROUP, DISCOVERY, DISCOVERY_INTERVAL } from '../constants';

type Props = {
  ip: ?string,
  port: ?number,
  group: ?string,
  children: Children,
  addDevice: () => void,
  removeDevice: () => void
};

const timer = {};

class DeviceManager extends Component<Props> {
  componentWillMount() {
    this.startDiscovery();
  }

  startDiscovery() {
    const { port = DEVICES_PORT, group = DEVICES_GROUP, ip = IP } = this.props;
    const socket = createSocket('udp4');

    function discovery() {
      socket.send(DISCOVERY, 0, DISCOVERY.length, port, group);
    }

    socket.on('error', console.log);

    socket.once('listening', () => {
      setInterval(discovery, DISCOVERY_INTERVAL);
      discovery();
    });

    socket.on('message', (data) => {
      try {
        const uid = data.slice(0, 6).map(i => i.toString(16)).join(':');
        switch (data[6]) {
          case 0xf0: {
            clearTimeout(timer[uid]);
            this.props.addDevice(uid, data.slice(7, 4).join('.'), data[11]);
            timer[uid] = setTimeout(() => {
              this.props.removeDevice(uid);
              delete timer[uid];
            }, 2 * DISCOVERY_INTERVAL);
            break;
          }
          default:
            break;
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.bind(port, ip);
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators({ addDevice, removeDevice }, dispatch)
)(DeviceManager);
