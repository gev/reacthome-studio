
import { Component } from 'react';
import { createSocket } from 'dgram';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import os from 'os';
// import { AppState, AsyncStorage, Platform } from 'react-native';
import { addApps, removeApps, runApp } from './actions';
import { CURRENT_APP, PORT, GROUP, DISCOVERY, DISCOVERY_INTERVAL } from './constants';

type Props = {
  name: ?string,
  port: ?string,
  group: ?string,
  children: Children,
  runApp: () => void,
  addApps: () => void,
  removeApps: () => void
};

const timer = {};

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

  startDiscovery() {
    const { port = PORT, group = GROUP } = this.props;
    const socket = createSocket('udp4');

    function discovery() {
      socket.send(DISCOVERY, 0, DISCOVERY.length, port, group, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    socket.on('error', console.log);

    socket.once('listening', () => {
      setInterval(discovery, DISCOVERY_INTERVAL);
      discovery();
    });

    socket.on('message', (data) => {
      try {
        /* eslint no-bitwise: "off" */
        const host = `${data.slice(0, 4).join('.')}:${(data[4] << 8) | data[5]}`;

        clearTimeout(timer[host]);

        timer[host] = setTimeout(() => {
          this.props.removeApps(host);
          delete timer[host];
        }, 2 * DISCOVERY_INTERVAL);

        const filter = ({ apps = [] }) =>
          apps.filter(({ platform = [] }) => platform.includes(os.platform()));

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

    socket.bind();
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators({ addApps, removeApps, runApp }, dispatch)
)(AppManager);
