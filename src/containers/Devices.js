
import React, { Component } from 'react';
import { CircularProgress, withStyles } from 'material-ui';
import type { StyleRules } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Device from './Device';

const styles = (theme) => ({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    padding: theme.spacing.unit * 2
  }
});

type Props = {
  devices: [],
  classes: StyleRules
};

class Devices extends Component<Props> {
  render() {
    const { devices, classes } = this.props;
    return (
      <div className={classes.container}>
        {
          devices.length > 0
            ? devices.map((device) => (
              <div key={device.id} className={classes.item}>
                <Device {...device} />
              </div>
            ))
            : <CircularProgress size={100} color="primary" />
        }
      </div>
    );
  }
}

export default connect(
  ({ devices }, props) => ({ ...props, devices }),
  (dispatch) => bindActionCreators({ }, dispatch)
)(withStyles(styles)(Devices));
