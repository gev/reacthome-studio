
import { Component } from 'react';
import { createSocket } from 'react-native-udp';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, AsyncStorage, Platform } from 'react-native';
import { addApps, removeApps, runApp } from './actions';
import { CURRENT_APP, PORT, GROUP } from './constants';

const timer = {};

type Props = {
  name: ?string,
  port: ?string,
  group: ?string,
  children: Children,
  runApp: () => void,
  addApps: () => void,
  removeApps: () => void
};

class AppManager extends Component<Props> {
  componentWillMount() {
    const { name } = this.props;

    if (name) {
      AsyncStorage.setItem(CURRENT_APP, name)
        .catch(console.log);
    } else {
      AsyncStorage.getItem(CURRENT_APP)
        .finally(app => {
          if (name) {
            AsyncStorage.removeItem(CURRENT_APP)
              .finally(() => {
                this.props.runApp(app);
              })
              .catch(console.log);
          }
        })
        .catch(console.log);
    }

    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        this.startUDP();
      }
    });

    this.startUDP();
  }

  startUDP() {
    const { port = PORT, group = GROUP } = this.props;
    const socket = createSocket('udp4');

    socket.on('error', console.log);

    socket.once('listening', () => {
      socket.addMembership(group);
    });

    socket.on('message', (data) => {
      /* eslint no-bitwise: "off" */
      const host = `${data.slice(0, 4).join('.')}:${(data[4] << 8) | data[5]}`;
      const interval = 2 * ((data[6] << 8) | data[7]);

      clearTimeout(timer[host]);

      timer[host] = setTimeout(() => {
        this.props.removeApps(host);
        delete timer[host];
      }, interval);

      const filter = ({ apps = [] }) =>
        apps.filter(({ platform = [] }) => platform.includes(Platform.OS));

      fetch(`http://${host}/apps.json`)
        .then(response => response.json())
        .finally(apps => {
          this.props.addApps(host, { ...apps, apps: filter(apps) });
        })
        .catch(console.log);
    });

    socket.bind(port);
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators({ addApps, removeApps, runApp }, dispatch)
)(AppManager);
