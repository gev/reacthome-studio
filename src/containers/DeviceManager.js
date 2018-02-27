
import path from 'path';
import randombytes from 'randombytes';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { Component } from 'react';
import { createSocket } from 'dgram';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addDevice,
  removeDevice,
  updateDevice,
  updatingFirmware,
  deviceReady
} from '../actions';
import {
  IP,
  DEVICES_PORT,
  DEVICES_GROUP,
  DISCOVERY,
  DISCOVERY_INTERVAL,
  UPDATE_FIRMWARE,
  BOOTLOAD,
  BOOTLOAD_FINISH,
  BOOTLOAD_WRITE,
  MAC_ADDRESS,
  DEFAULT_MAC_ADDRESS,
  ERROR,
} from '../constants';

type Props = {
  ip: string,
  port: ?number,
  group: ?string,
  workspace: string,
  project: string,
  build: string,
  devices: ?[],
  children: Children,
  addDevice: () => void,
  removeDevice: () => void,
  updateDevice: (Object) => void,
  updatingFirmware: (string) => void,
  deviceReady: (string) => void
};

class DeviceManager extends Component<Props> {
  componentWillMount() {
    const { ip = IP } = this.props;
    const a = ip.split('.');
    a.unshift(DISCOVERY);
    this.startDiscovery(Buffer.from(a));
  }

  componentDidUpdate() {
    this.props.devices
      .filter(device => device.status === UPDATE_FIRMWARE)
      .forEach(device => {
        this.props.updatingFirmware(device.id);
        this.updateFirmware(device);
      });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  timer = {};
  firmwareQueue = {};

  send = (buff, ip) => {
    const { port = DEVICES_PORT } = this.props;
    this.socket.send(buff, port, ip);
  }

  startDiscovery(buff) {
    const { port = DEVICES_PORT, group = DEVICES_GROUP, ip = IP } = this.props;

    this.socket = createSocket('udp4');

    const discovery = () => {
      this.send(buff, group);
    };

    this.socket.on('error', console.log);

    this.socket.once('listening', () => {
      setInterval(discovery, DISCOVERY_INTERVAL);
      discovery();
    });

    this.socket.on('message', (data, { address }) => {
      const { devices } = this.props;
      try {
        const id = Array.from(data.slice(0, 6)).map(i => `0${i.toString(16)}`.slice(-2)).join(':');
        const device = devices.find(i => i.id === id);
        switch (data[6]) {
          case DISCOVERY: {
            if (id === DEFAULT_MAC_ADDRESS) {
              const a = randombytes(7);
              a[0] = MAC_ADDRESS;
              a[1] &= 0b11111110;
              a[1] |= 0b00000010;
              this.send(Buffer.from(a), address);
            }
            clearTimeout(this.timer[id]);
            let type;
            let version;
            if (data.length === 10) {
              [,,,,,,, type] = data;
              version = data.slice(8, 10).join('.');
            }
            if (device) {
              this.props.updateDevice({
                ...device, ip: address, type, version
              });
            } else {
              this.props.addDevice({
                id, ip: address, type, version
              });
            }
            this.timer[id] = setTimeout(() => {
              this.props.removeDevice(id);
              delete this.timer[id];
            }, 2 * DISCOVERY_INTERVAL);
            break;
          }
          case BOOTLOAD: {
            const queue = this.firmwareQueue[id];
            if (queue) {
              if (queue.length > 0) {
                this.send(queue.shift(), address);
              } else {
                this.send(Buffer.from([BOOTLOAD, BOOTLOAD_FINISH]), address);
                this.props.deviceReady(id);
              }
            }
            break;
          }
          case ERROR:
            if (data[7] === BOOTLOAD) {
              this.props.deviceReady(id);
            }
            break;
          default:
            console.error(data);
            break;
        }
      } catch (err) {
        console.log(err);
      }
    });

    this.socket.bind(port, ip);
  }

  updateFirmware(device) {
    const queue = [];
    const { workspace, project, build } = this.props;
    const file = path.normalize(path.join(workspace, project, 'dist', device.newFirmware, build, `${project}.${build}.hex`));
    const lineReader = createInterface({ input: createReadStream(file) });
    let buff;
    let stop = false;

    lineReader.on('line', (line) => {
      switch (line[8]) {
        case '0': {
          if (!stop) {
            try {
              const size = parseInt(line.slice(1, 3), 16);
              const address = parseInt(line.slice(3, 7), 16);
              let rowAddress = address - (address % 0x40);
              let offset = address - rowAddress;
              for (let i = 0; i < size; i++) {
                const j = (9 + (2 * i));
                let index = offset + i;
                if ((index % 0x40) === 0) {
                  rowAddress += index;
                  buff = Buffer.alloc(70);
                  buff.fill(0xff);
                  buff.writeUInt8(BOOTLOAD, 0);
                  buff.writeUInt8(BOOTLOAD_WRITE, 1);
                  buff.writeUInt32BE(rowAddress, 2);
                  queue.push(buff);
                  offset -= index;
                  index = 0;
                }
                buff.writeUInt8(parseInt(line.slice(j, j + 2), 16), 6 + index);
              }
            } catch (err) {
              console.log(err);
            }
          }
          break;
        }
        case '1': {
          this.firmwareQueue[device.id] = queue;
          this.send(queue.shift(), device.ip);
          break;
        }
        case '4':
          stop = true;
          break;
        default:
          console.log(line);
      }
    });
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  ({ devices }, props) => ({ ...props, devices }),
  dispatch => bindActionCreators({
    addDevice, removeDevice, updateDevice, updatingFirmware, deviceReady
  }, dispatch)
)(DeviceManager);
