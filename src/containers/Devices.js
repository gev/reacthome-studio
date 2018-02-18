
import ip from 'ip';
import { createSocket } from 'dgram';
import React, { Component } from 'react';
import { CircularProgress, MenuList, MenuItem, ListItemText, Typography, withStyles } from 'material-ui';
import { ChevronRight } from 'material-ui-icons';
import type { StyleRules } from 'material-ui';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

const PORT = 2017;
const GROUP = '224.0.0.1';
const DISCOVERY = Buffer.conat([Buffer.from([0xf0]), ip().split('.')]);
const INTERVAL = 1000;

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

type Props = {
  // apps: {},
  classes: StyleRules
};

const timers = {};

class Apps extends Component<Props> {
  state = { devices: {} };

  componentWillMount() {
    this.socket = createSocket('udp4');

    this.socket.on('error', console.log);

    this.socket.once('listening', () => {
      this.timer = setInterval(() => {
      }, 1000);
    });

    this.socket.on('message', (data) => {
      switch (data[6]) {
        case 0xf0: {
          const { devices } = this.state;
          const uid = data.slice(0, 6).map(i => i.toString(16)).join(':');
          clearTimeout(timers[uid]);
          this.setState({ devices: { ...devices, uid: { ip: data.slice(7, 3).join('.'), type: data[11] } } });
          break;
        }
        default:
          break;
      }
    });

    this.socket.bind(PORT, ip);

    setInterval(() => {
      this.socket.send(DISCOVERY, PORT, GROUP);
    }, INTERVAL);
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { devices } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {
          devices.length > 0
            ? apps.map(s => (
              <div key={s.name}>
                <Typography component="h1" type="headline" align="center">{s.title}</Typography>
                <MenuList>
                  {
                    s.apps.map(app => (
                      <MenuItem key={app.name} onClick={this.downloadApp(app.name, s.host)}>
                        <ListItemText
                          primary={app.title}
                          secondary={app.description}
                        />
                        <ChevronRight />
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </div>
            ))
            : <CircularProgress size={100} color="primary" />
        }
      </div>
    );
  }
}

// export default connect(
//   ({ apps }, props) => ({ apps, ...props }),
//   (dispatch) => bindActionCreators({ }, dispatch)
// )(withStyles(styles)(Apps));

export default withStyles(styles)(Apps);
