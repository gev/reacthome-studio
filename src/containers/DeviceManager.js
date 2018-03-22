
import path from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { Component } from 'react';
import { createSocket } from 'dgram';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SERVICE_PORT, SERVICE_GROUP } from '../constants';
import dispatchAction from '../actions';

type Props = {
  workspace: string,
  project: string,
  build: string,
  children: Children,
  dispatchAction: (action: {}, port: number, address: string) => void
};

class DeviceManager extends Component<Props> {
  componentWillMount() {
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

  // componentDidUpdate(prevProps) {
  //   this.props.devices.forEach((device) => {
  //     const prev = prevProps.devices.find(i => i.id === device.id) || {};
  //     if (device.finding !== prev.finding) {
  //       this.send(Buffer.from([FIND_ME, device.finding ? 1 : 0]), device.ip);
  //     }
  //     if (device.updating && !prev.updating) {
  //       this.updateFirmware(device);
  //     }
  //     if (device.state !== prev.state) {
  //       switch (device.type) {
  //         case DEVICE_DIM4: {
  //           Object.entries(device.state).forEach(([i, v]) => {
  //             if (v.type !== ((prev.state || {})[i] || {}).type) {
  //               this.send(Buffer.from([DIMMER, parseInt(i, 10), DIM_TYPE, v.type]), device.ip);
  //             }
  //             if (v.value !== ((prev.state || {})[i] || {}).value) {
  //               this.send(Buffer.from([
  //                 DIMMER, parseInt(i, 10), DIM_FADE, v.value, 40
  //               ]), device.ip);
  //             }
  //           });
  //           break;
  //         }
  //         case DEVICE_DO8: {
  //           Object.entries(device.state).forEach(([i, v]) => {
  //             if (v.value !== ((prev.state || {})[i] || {}).value) {
  //               this.send(Buffer.from([
  //                 DO, parseInt(i, 10), v.value
  //               ]), device.ip);
  //             }
  //           });
  //           break;
  //         }
  //         default:
  //       }
  //     }
  //   });
  // }

  componentWillUnmount() {
    this.socket.close();
  }

  // timer = {};
  // firmwareQueue = {};

  // send = (buff, ip) => {
  //   const { port = DEVICES_PORT } = this.props;
  //   this.socket.send(buff, port, ip);
  // }

  // sendFirmware = (queue, packet, ip) => {
  //   console.log(queue.length);
  //   queue.timeout = setTimeout(() => {
  //     console.log(packet);
  //     this.sendFirmware(queue, packet, ip);
  //   }, 1000);
  //   this.send(packet, ip);
  // }

  // startDiscovery(buff) {
  //   const { port = DEVICES_PORT, group = DEVICES_GROUP, ip = IP } = this.props;

  //   this.socket = createSocket('udp4');

  //   const discovery = () => {
  //     this.send(buff, group);
  //   };

  //   this.socket.on('error', console.log);

  //   this.socket.once('listening', () => {
  //     setInterval(discovery, DISCOVERY_INTERVAL);
  //     discovery();
  //   });

  //   this.socket.on('message', (data, { address }) => {
  //     const { devices } = this.props;
  //     try {
  //       const id = Array.from(data.slice(0, 6)).map(i => `0${i.toString(16)}`.slice(-2)).join(':');
  //       const device = devices.find(i => i.id === id);
  //       switch (data[6]) {
  //         case READY:
  //         case DISCOVERY: {
  //           const ready = data[6] === READY;

  //           clearTimeout(this.timer[id]);

  //           let type;
  //           let version;
  //           if (data.length === 10) {
  //             [,,,,,,, type] = data;
  //             version = data.slice(8, 10).join('.');
  //           }

  //           if (id === DEFAULT_MAC_ADDRESS) {
  //             const a = randombytes(7);
  //             a[0] = MAC_ADDRESS;
  //             a[1] &= 0b11111110;
  //             a[1] |= 0b00000010;
  //             this.send(Buffer.from(a), address);
  //           }

  //           if (device) {
  //             // if (device.ip !== address ||
  //             //     device.type !== type ||
  //             //     device.version !== version ||
  //             //     device.offline) {
  //                 let { pending, updating } = device;
  //                 if (pending) {
  //                   pending = false;
  //                   updating = true;
  //                 }
  //                 this.props.updateDevice({
  //                   ...device, ip: address, type, version, offline: false, pending, updating, ready
  //                 });
  //             // }
  //           } else {
  //             this.props.addDevice({
  //               id, ip: address, type, version, ready
  //             });
  //           }

  //           this.timer[id] = setTimeout(() => {
  //             if (id === DEFAULT_MAC_ADDRESS) {
  //               this.props.removeDevice(id);
  //             } else {
  //               this.props.setDeviceStatus(id, { offline: true });
  //               this.timer[id] = setTimeout(() => {
  //                 this.props.removeDevice(id);
  //               }, 60000);
  //             }
  //           }, 2 * DISCOVERY_INTERVAL);
  //           break;
  //         }
  //         case BOOTLOAD: {
  //           switch (data[7]) {
  //             case BOOTLOAD_SUCCESS: {
  //               const queue = this.firmwareQueue[id];
  //               if (queue) {
  //                 clearTimeout(queue.timeout);
  //                 if (queue.length > 0) {
  //                   this.sendFirmware(queue, queue.shift(), address);
  //                 } else {
  //                   this.props.setDeviceStatus(id, { updating: false });
  //                   this.send(Buffer.from([BOOTLOAD, BOOTLOAD_FINISH]), address);
  //                 }
  //               }
  //               break;
  //             }
  //             default:
  //           }
  //           break;
  //         }
  //         case DOPPLER:
  //           this.props.setDeviceState(id, { value: data.readUInt16LE(8) });
  //           break;
  //         case DIMMER:
  //           // this.props.setDeviceState(id, { [data[7]]: { type: data[8], value: data[9] } });
  //           console.log(data);
  //           break;
  //         case ERROR:
  //           if (data[7] === BOOTLOAD) {
  //             console.log(data);
  //             this.props.setDeviceStatus(id, { updating: false });
  //             const queue = this.firmwareQueue[id];
  //             if (queue) {
  //               clearTimeout(queue.timeout);
  //             }
  //           }
  //           break;
  //         default:
  //           console.error(data);
  //           break;
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });

  //   this.socket.bind(port, ip);
  // }

  // updateFirmware(device) {
  //   const queue = [];
  //   const { workspace, project, build } = this.props;
  //   const file = path.normalize(path.join(workspace, project, 'dist', device.newFirmware, build, `${project}.${build}.hex`));
  //   const lineReader = createInterface({ input: createReadStream(file) });
  //   let packet;
  //   let stop = false;

  //   lineReader.on('line', (line) => {
  //     switch (line[8]) {
  //       case '0': {
  //         if (!stop) {
  //           try {
  //             const size = parseInt(line.slice(1, 3), 16);
  //             const address = parseInt(line.slice(3, 7), 16);
  //             let rowAddress = address - (address % 0x40);
  //             let offset = address - rowAddress;
  //             for (let i = 0; i < size; i++) {
  //               const j = (9 + (2 * i));
  //               let index = offset + i;
  //               if ((index % 0x40) === 0) {
  //                 rowAddress += index;
  //                 packet = Buffer.alloc(70);
  //                 packet.fill(0xff);
  //                 packet.writeUInt8(BOOTLOAD, 0);
  //                 packet.writeUInt8(BOOTLOAD_WRITE, 1);
  //                 packet.writeUInt32BE(rowAddress, 2);
  //                 queue.push(packet);
  //                 offset -= index;
  //                 index = 0;
  //               }
  //               packet.writeUInt8(parseInt(line.slice(j, j + 2), 16), 6 + index);
  //             }
  //           } catch (err) {
  //             console.log(err);
  //           }
  //         }
  //         break;
  //       }
  //       case '1': {
  //         this.firmwareQueue[device.id] = queue;
  //         this.sendFirmware(queue, queue.shift(), device.ip);
  //         break;
  //       }
  //       case '4':
  //         stop = true;
  //         break;
  //       default:
  //         console.log(line);
  //     }
  //   });
  // }

  render() {
    return this.props.children;
  }
}

export default connect(
  ({ devices }, props) => ({ ...props, devices }),
  dispatch => bindActionCreators({ dispatchAction }, dispatch)
)(DeviceManager);
