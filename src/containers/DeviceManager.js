
import { Component } from 'react';
import { createSocket } from 'dgram';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addDevice, removeDevice } from '../actions';
import { IP, DEVICES_PORT, DEVICES_GROUP, DISCOVERY, DISCOVERY_INTERVAL } from '../constants';

type Props = {
  ip: string,
  port: ?number,
  group: ?string,
  devices: ?[],
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

    this.socket = createSocket('udp4');

    const discovery = () => {
      this.socket.send(buff, 0, buff.length, port, group);
    };

    this.socket.on('error', console.log);

    this.socket.once('listening', () => {
      setInterval(discovery, DISCOVERY_INTERVAL);
      discovery();
    });

    this.socket.on('message', (data) => {
      const { devices } = this.props;
      try {
        const id = Array.from(data.slice(0, 6)).map(i => `0${i.toString(16)}`.slice(-2)).join(':');
        switch (data[6]) {
          case DISCOVERY: {
            clearTimeout(timer[id]);
            const address = `${data[10]}:${data[9]}:${data[8]}:${data[7]}`;
            const type = data[11];
            const device = devices.some(i =>
              i.id === id && i.ip === address && i.type === type);
            if (!device) {
              this.props.addDevice(id, address, type);
            }
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

    this.socket.bind(port, ip);
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  ({ devices }, props) => ({ ...props, devices }),
  dispatch => bindActionCreators({ addDevice, removeDevice }, dispatch)
)(DeviceManager);
