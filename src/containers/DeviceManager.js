
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
    const { ip = IP } = this.props;
    const a = ip.split('.');
    a.unshift(DISCOVERY);
    this.startDiscovery(Buffer.from(a));
  }

  componentWillUnmount() {
    this.socket.close();
  }

  startDiscovery(buff) {
    const { port = DEVICES_PORT, group = DEVICES_GROUP, ip = IP } = this.props;
    const socket = createSocket('udp4');

    function discovery() {
      socket.send(buff, 0, buff.length, port, group);
    }

    socket.on('error', console.log);

    socket.once('listening', () => {
      setInterval(discovery, DISCOVERY_INTERVAL);
      discovery();
    });

    socket.on('message', (data) => {
      try {
        const id = data.slice(0, 6).map(i => i.toString(16)).join(':');
        switch (data[6]) {
          case 0xf0: {
            clearTimeout(timer[id]);
            this.props.addDevice(id, data.slice(7, 4).join('.'), data[11]);
            timer[id] = setTimeout(() => {
              this.props.removeDevice(id);
              delete timer[id];
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
