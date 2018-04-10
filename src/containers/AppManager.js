
import { Component } from 'react';
import { createSocket } from 'dgram';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { AppState, AsyncStorage, Platform } from 'react-native';
import { addApps, removeApps, runApp } from '../actions';
import { CURRENT_APP, APPS_PORT, APPS_GROUP, DISCOVERY, DISCOVERY_INTERVAL, PLATFORM } from '../constants';

type Props = {
  name: ?string,
  port: ?number,
  group: ?string,
  children: Children,
  runApp: () => void,
  addApps: () => void,
  removeApps: () => void
};

const timer = {};
const buff = Buffer.from([DISCOVERY]);

class AppManager extends Component<Props> {
  componentWillMount() {
    const { name } = this.props;

    // if (name) {
    //   AsyncStorage.setItem(CURRENT_APP, name)
    //     .catch(console.log);
    // } else {
    //   AsyncStorage.getItem(CURRENT_APP)
    //     .finally(app => {
    //       if (name) {
    //         AsyncStorage.removeItem(CURRENT_APP)
    //           .finally(() => {
    //             this.props.runApp(app);
    //           })
    //           .catch(console.log);
    //       }
    //     })
    //     .catch(console.log);
    // }

    // AppState.addEventListener('change', (state) => {
    //   if (state === 'active') {
    //     this.startDiscovery();
    //   }
    // });
    this.startDiscovery();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  startDiscovery() {
    const { port = APPS_PORT, group = APPS_GROUP } = this.props;
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
      try {
        /* eslint no-bitwise: "off" */
        const host = `${data.slice(0, 4).join('.')}:${(data[4] << 8) | data[5]}`;

        clearTimeout(timer[host]);

        timer[host] = setTimeout(() => {
          this.props.removeApps(host);
          delete timer[host];
        }, 2 * DISCOVERY_INTERVAL);

        const filter = ({ apps = [] }) =>
          apps.filter(({ platform = [] }) => platform.includes(PLATFORM));

        fetch(`http://${host}/apps.json`)
          .then(response => response.json())
          .then(apps => {
            this.props.addApps(host, { ...apps, apps: filter(apps) });
          })
          .catch(console.log);
      } catch (err) {
        console.log(err);
      }
    });

    this.socket.bind();
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  (state, props) => props,
  dispatch => bindActionCreators({ addApps, removeApps, runApp }, dispatch)
)(AppManager);