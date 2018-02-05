
import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import type { StyleRules } from 'material-ui';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100vh',
  },
  logo: {
    animation: 'logo-animation infinite 2s linear',
    height: '25vh',
  },
  title: {
    fontSize: '1.5em',
    color: 'white',
  },
  content: {
    width: '100vh',
    height: '80vh',
  },
  '@keyframes logo-animation': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(0.9)' },
    '100%': { transform: 'scale(1)' },
  },
};

type Props = {
  classes: StyleRules
};

class Main extends Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <img src="./assets/logo.svg" className={classes.logo} alt="logo" />
        <h1 className={classes.title}>Welcome to Reacthome</h1>
        <webview className={classes.content} src="https://threejs.org/examples/webgl_geometry_cube.html" />
      </div>
    );
  }
}

export default withStyles(styles)(Main);
